import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productsRepository.create(createProductDto);
      return await this.productsRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async findByCategory(categoria: string): Promise<Product[]> {
    return await this.productsRepository.find({ where: { categoria } });
  }

  async findByName(nombre: string): Promise<Product[]> {
    return await this.productsRepository.find({
      where: { nombre: Like(`%${nombre}%`) }
    });
  }

  async findWithFilters(filters: { id?: string; nombre?: string; categoria?: string }): Promise<Product[] | Product> {
    // Si solo se proporciona ID, usar findOne para obtener un único producto
    if (filters.id && !filters.nombre && !filters.categoria) {
      return this.findOne(filters.id);
    }

    // Construir objeto de condiciones para la consulta
    const whereConditions: any = {};
    
    if (filters.nombre) {
      whereConditions.nombre = Like(`%${filters.nombre}%`);
    }
    
    if (filters.categoria) {
      whereConditions.categoria = filters.categoria;
    }
    
    return await this.productsRepository.find({ where: whereConditions });
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    
    if (product.stock + quantity < 0) {
      throw new InternalServerErrorException('No hay suficiente stock disponible');
    }
    
    product.stock += quantity;
    return await this.productsRepository.save(product);
  }
}