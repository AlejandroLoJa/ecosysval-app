import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // 🔹 Nueva columna para imagen de perfil
  @Column({ type: 'text', nullable: true })
  profile_image: string;

  // 🔹 Nueva columna para banner
  @Column({ type: 'text', nullable: true })
  banner_image: string;
}
