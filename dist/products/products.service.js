"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async create(createProductDto) {
        try {
            const product = this.productsRepository.create(createProductDto);
            return await this.productsRepository.save(product);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al crear el producto');
        }
    }
    async findAll() {
        return await this.productsRepository.find();
    }
    async findOne(id) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        return product;
    }
    async findByCategory(categoria) {
        return await this.productsRepository.find({ where: { categoria } });
    }
    async findByName(nombre) {
        return await this.productsRepository.find({
            where: { nombre: (0, typeorm_2.Like)(`%${nombre}%`) }
        });
    }
    async findWithFilters(filters) {
        if (filters.id && !filters.nombre && !filters.categoria) {
            return this.findOne(filters.id);
        }
        const whereConditions = {};
        if (filters.nombre) {
            whereConditions.nombre = (0, typeorm_2.Like)(`%${filters.nombre}%`);
        }
        if (filters.categoria) {
            whereConditions.categoria = filters.categoria;
        }
        return await this.productsRepository.find({ where: whereConditions });
    }
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        Object.assign(product, updateProductDto);
        return await this.productsRepository.save(product);
    }
    async remove(id) {
        const result = await this.productsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado`);
        }
    }
    async updateStock(id, quantity) {
        const product = await this.findOne(id);
        if (product.stock + quantity < 0) {
            throw new common_1.InternalServerErrorException('No hay suficiente stock disponible');
        }
        product.stock += quantity;
        return await this.productsRepository.save(product);
    }
    async checkStock(id, requestedQuantity) {
        const product = await this.findOne(id);
        return {
            hasStock: product.stock >= requestedQuantity,
            currentStock: product.stock
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map