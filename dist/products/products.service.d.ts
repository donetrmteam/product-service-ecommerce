import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    findByCategory(categoria: string): Promise<Product[]>;
    findByName(nombre: string): Promise<Product[]>;
    findWithFilters(filters: {
        id?: string;
        nombre?: string;
        categoria?: string;
    }): Promise<Product[] | Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
    updateStock(id: string, quantity: number): Promise<Product>;
}
