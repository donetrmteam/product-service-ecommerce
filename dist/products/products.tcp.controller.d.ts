import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductsTcpController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(data: {
        createProductDto: CreateProductDto;
    }): Promise<Product>;
    findAll(data: {
        filters?: {
            categoria?: string;
            nombre?: string;
        };
    }): Promise<Product[]>;
    findOne(data: {
        id: string;
    }): Promise<Product>;
    update(data: {
        id: string;
        updateProductDto: UpdateProductDto;
    }): Promise<Product>;
    remove(data: {
        id: string;
    }): Promise<void>;
    updateStock(data: {
        id: string;
        quantity: number;
    }): Promise<Product>;
    checkStock(data: {
        id: string;
        requestedQuantity: number;
    }): Promise<{
        hasStock: boolean;
        currentStock: number;
    }>;
}
