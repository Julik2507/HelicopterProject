import swaggerJSDoc from "swagger-jsdoc";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "express project",
            version: "1.0.0",
        },
        servers: [{ api: "http://localhost:3000" }],
    },
    apis: ["./modules/auth/auth.controller.ts"],
};
export const swaggerSpec = swaggerJSDoc(options);
//# sourceMappingURL=index.js.map