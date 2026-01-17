import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { EmpleoService } from "./empleo.service";
import { CreateEmpleoDto } from "./dto/create-empleo.dto";
import { UpdateEmpleoDto } from "./dto/update-empleo.dto";

@Controller("empleos")
export class EmpleoController {
  constructor(private readonly empleoService: EmpleoService) {}

  @Post()
  create(@Body() dto: CreateEmpleoDto) {
    return this.empleoService.create(dto);
  }

  @Get()
  findAll() {
    return this.empleoService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.empleoService.findOne(Number(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateEmpleoDto) {
    return this.empleoService.update(Number(id), dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.empleoService.remove(Number(id));
  }

  @Patch(":id/cerrar")
  cerrar(@Param("id") id: string) {
    return this.empleoService.cerrar(Number(id));
  }
}
