import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Empleo } from "./empleo.entity";
import { EmpleoController } from "./empleo.controller";
import { EmpleoService } from "./empleo.service";

@Module({
  imports: [TypeOrmModule.forFeature([Empleo])],
  controllers: [EmpleoController],
  providers: [EmpleoService],
})
export class EmpleoModule {}
