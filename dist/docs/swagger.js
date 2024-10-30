"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const setupSwagger = (app) => {
    const swaggerOptions = {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "ToDo List API app",
                version: "1.0.0",
                description: "API Documentation",
            },
            servers: [
                {
                    url: `http://localhost:3000/`,
                },
            ],
        },
        apis: ["./src/routes/v1/*.ts"],
    };
    const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
};
exports.default = setupSwagger;
