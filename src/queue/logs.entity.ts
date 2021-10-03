import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  newslettername: string;

  @Column({ length: 100 })
  email: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
