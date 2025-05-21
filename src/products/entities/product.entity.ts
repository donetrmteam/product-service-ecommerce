import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('productos')
export class Product {
  @ApiProperty({
    description: 'ID único del producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Smartphone XYZ',
  })
  @Column({ length: 100 })
  nombre: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Smartphone de última generación con 8GB RAM y 128GB almacenamiento',
  })
  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 599.99,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @ApiProperty({
    description: 'Stock disponible',
    example: 100,
  })
  @Column({ default: 0 })
  stock: number;

  @ApiProperty({
    description: 'Categoría del producto',
    example: 'Electrónica',
  })
  @Column({ length: 50, nullable: true })
  categoria: string;

  @ApiProperty({
    description: 'Fecha de creación del registro',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}