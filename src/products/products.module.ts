import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsTcpController } from './products.tcp.controller';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsTcpController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}