import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Capacitacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  email: string;

  @Column()
  estado: string;

  @Column()
  telefono: string;

  @Column()
  empresa: string;

  @Column()
  cargo: string;

  @Column()
  interes: string;

  @Column({ nullable: true })
  mensaje: string;

  @CreateDateColumn()
  fecha: Date;
}
