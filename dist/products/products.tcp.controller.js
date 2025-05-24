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
exports.ProductsTcpController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const products_service_1 = require("./products.service");
const dotenv = require("dotenv");
dotenv.config();
let ProductsTcpController = class ProductsTcpController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(data) {
        return this.productsService.create(data.createProductDto);
    }
    async findAll(data) {
        var _a, _b, _c, _d;
        if (((_a = data.filters) === null || _a === void 0 ? void 0 : _a.categoria) && ((_b = data.filters) === null || _b === void 0 ? void 0 : _b.nombre)) {
            return this.productsService.findWithFilters({ categoria: data.filters.categoria, nombre: data.filters.nombre });
        }
        if ((_c = data.filters) === null || _c === void 0 ? void 0 : _c.categoria) {
            return this.productsService.findByCategory(data.filters.categoria);
        }
        if ((_d = data.filters) === null || _d === void 0 ? void 0 : _d.nombre) {
            return this.productsService.findByName(data.filters.nombre);
        }
        return this.productsService.findAll();
    }
    async findOne(data) {
        return this.productsService.findOne(data.id);
    }
    async update(data) {
        return this.productsService.update(data.id, data.updateProductDto);
    }
    async remove(data) {
        return this.productsService.remove(data.id);
    }
    async updateStock(data) {
        return this.productsService.updateStock(data.id, data.quantity);
    }
    async checkStock(data) {
        return this.productsService.checkStock(data.id, data.requestedQuantity);
    }
};
exports.ProductsTcpController = ProductsTcpController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_product' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsTcpController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_products' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsTcpController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_product_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsTcpController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_product' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsTcpController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'remove_product' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsTcpController.prototype, "remove", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_product_stock' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsTcpController.prototype, "updateStock", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'check_product_stock' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsTcpController.prototype, "checkStock", null);
exports.ProductsTcpController = ProductsTcpController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsTcpController);
//# sourceMappingURL=products.tcp.controller.js.map