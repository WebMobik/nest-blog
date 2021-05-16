import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {}

    async createUser({role, ...dto}: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const userRole = await this.roleService.getRolesByValue(role || "USER");
        await user.$set('roles', [userRole.id]);
        user.roles = [userRole];
        return user;
    }

    async getAllUsers() { 
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async removeUser(id: string) {
        const user = await this.userRepository.destroy({where: {id}});
        return user;
    }

}
