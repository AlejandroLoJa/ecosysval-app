import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("empleos")
export class Empleo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 140 })
  titulo: string;

  @Column({ type: "varchar", length: 140 })
  empresa: string;

  @Column({ type: "varchar", length: 120, nullable: true })
  ubicacion?: string; // "Madrid, Cundinamarca"

  @Column({ type: "varchar", length: 60, nullable: true })
  modalidad?: string; // Presencial / Remoto / Híbrido

  @Column({ type: "varchar", length: 60, nullable: true })
  jornada?: string; // Tiempo completo / Medio tiempo

  @Column({ type: "varchar", length: 80, nullable: true })
  contrato?: string; // Obra o labor / Indefinido

  @Column({ type: "varchar", length: 80, nullable: true })
  salario?: string; // "$1.509.000 (Mensual)" (por ahora string)

  @Column({ type: "text" })
  descripcion: string;

  @Column({ type: "text", nullable: true })
  requisitos?: string; // puedes guardar texto con saltos de línea

  @Column({ type: "text", nullable: true })
  beneficios?: string;

  @Column({ type: "varchar", length: 30, default: "ACTIVA" })
  estado: "ACTIVA" | "CERRADA";

  // Si luego quieres vincular al usuario que publica:
  @Column({ type: "int", nullable: true })
  userId?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
