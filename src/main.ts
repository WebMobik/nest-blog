import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

const start = async () => {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)
  app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
}

start()