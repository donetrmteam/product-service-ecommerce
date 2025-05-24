import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Controller()
export class ProductsTcpController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create_product' })
  async create(@Payload() data: { createProductDto: CreateProductDto }): Promise<Product> {
    return this.productsService.create(data.createProductDto);
  }

  @MessagePattern({ cmd: 'find_all_products' })
  async findAll(@Payload() data: { filters?: { categoria?: string; nombre?: string } }): Promise<Product[]> {
    if (data.filters?.categoria && data.filters?.nombre) {
      return this.productsService.findWithFilters({ categoria: data.filters.categoria, nombre: data.filters.nombre }) as Promise<Product[]>;
    }
    if (data.filters?.categoria) {
      return this.productsService.findByCategory(data.filters.categoria);
    }
    if (data.filters?.nombre) {
      return this.productsService.findByName(data.filters.nombre);
    }
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'find_product_by_id' })
  async findOne(@Payload() data: { id: string }): Promise<Product> {
    return this.productsService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'update_product' })
  async update(@Payload() data: { id: string; updateProductDto: UpdateProductDto }): Promise<Product> {
    return this.productsService.update(data.id, data.updateProductDto);
  }

  @MessagePattern({ cmd: 'remove_product' })
  async remove(@Payload() data: { id: string }): Promise<void> {
    return this.productsService.remove(data.id);
  }

  @MessagePattern({ cmd: 'update_product_stock' })
  async updateStock(@Payload() data: { id: string; quantity: number }): Promise<Product> {
    return this.productsService.updateStock(data.id, data.quantity);
  }

  @MessagePattern({ cmd: 'check_product_stock' })
  async checkStock(@Payload() data: { id: string; requestedQuantity: number }): Promise<{ hasStock: boolean; currentStock: number }> {
    return this.productsService.checkStock(data.id, data.requestedQuantity);
  }
}