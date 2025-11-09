import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('difficulty')
export class Difficulty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}