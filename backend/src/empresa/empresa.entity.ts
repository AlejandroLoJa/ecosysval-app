import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  razonSocial: string;

  @Column()
  correo: string;

  @Column()
  ambito: string;

  @Column()
  ubicacion: string;

  @Column()
  representante: string;

  @Column()
  paginaWeb: string;

  @Column({ nullable: true })
  logo: string;

  @Column()
  volumenVentas: string;

  @Column()
  empleados: number;

  @Column()
  antiguedad: string;

  @Column({ type: 'text' })
  mision: string;

  @Column({ type: 'text' })
  vision: string;

  @Column({ nullable: true })
  sucursales: string;

  @Column({ nullable: true })
  socios: string;

  @Column({ default: false })
  importaciones: boolean;

  @Column({ default: false })
  exportaciones: boolean;

  @Column({ nullable: true })
  productos: string;

  @Column({ nullable: true })
  servicios: string;

  @Column({ nullable: true })
  objetivos: string;

  // 🔹 NUEVO: campos SCIAN
  @Column({ nullable: true, length: 10 })
  scianCodigo: string;

  @Column({ nullable: true, type: 'text' })
  scianDescripcion: string;

  @CreateDateColumn()
  createdAt: Date;
}
