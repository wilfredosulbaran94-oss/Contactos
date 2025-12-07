import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Contact {
  @ApiProperty({
    description: 'Contact unique identifier',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Contact name',
    example: 'John Doe',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Contact email address',
    example: 'john@example.com',
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+1234567890',
    nullable: true,
    required: false,
  })
  @Column({ nullable: true })
  phone: string | null;

  @ApiProperty({
    description: 'Contact address',
    example: '123 Main St',
    nullable: true,
    required: false,
  })
  @Column({ nullable: true })
  address: string | null;
}

