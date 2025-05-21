"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: process.env.TCP_HOST || 'localhost',
            port: parseInt(process.env.TCP_PORT || '3002'),
            retryAttempts: 5,
            retryDelay: 3000,
        },
        logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen();
    console.log(`Microservicio de productos iniciado en ${process.env.TCP_HOST || 'localhost'}:${process.env.TCP_PORT || 3002}`);
}
bootstrap();
//# sourceMappingURL=main.js.map