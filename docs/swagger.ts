import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

const setupSwagger = (app: express.Application) => {
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
    apis: ["./src/routes/*.ts"],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
export default setupSwagger;
