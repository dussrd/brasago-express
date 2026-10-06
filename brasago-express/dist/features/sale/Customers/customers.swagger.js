"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customersSwagger = void 0;
const bearerSecurity = [{ bearerAuth: [] }];
const unauthorizedResponse = { description: "No autenticado: token ausente o inválido" };
const forbiddenResponse = { description: "Sin autorización: recurso no concedido" };
/**
 * Documentación OpenAPI del feature Customers.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Modalidad documentada: JWT + RBAC (`authenticate` + `authorize`).
 * Cada operación declara `security`; requiere aplicar estos middlewares en las rutas.
 */
exports.customersSwagger = {
    "tags": [
        {
            "name": "Clientes",
            "description": "CRUD de clientes — **JWT + RBAC** (authenticate + authorize)"
        }
    ],
    "paths": {
        "/api/customers": {
            "get": {
                "tags": [
                    "Clientes"
                ],
                "summary": "Listar clientes activos",
                "description": "JWT + RBAC — retorna registros con status=active",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Lista de clientes",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "customers": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/components/schemas/Customer"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "No autenticado: token ausente o inválido"
                    },
                    "403": {
                        "description": "Sin autorización: recurso no concedido"
                    }
                }
            },
            "post": {
                "tags": [
                    "Clientes"
                ],
                "summary": "Crear cliente",
                "description": "JWT + RBAC",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Registro creado",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "customer": {
                                            "$ref": "#/components/schemas/Customer"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "No autenticado: token ausente o inválido"
                    },
                    "403": {
                        "description": "Sin autorización: recurso no concedido"
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CustomerCreate"
                            }
                        }
                    }
                }
            }
        },
        "/api/customers/{id}": {
            "get": {
                "tags": [
                    "Clientes"
                ],
                "summary": "Obtener cliente por id",
                "description": "JWT + RBAC — 404 si no existe o tiene borrado lógico",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Registro encontrado",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "customer": {
                                            "$ref": "#/components/schemas/Customer"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "id inválido (debe ser un entero positivo)"
                    },
                    "401": {
                        "description": "No autenticado: token ausente o inválido"
                    },
                    "403": {
                        "description": "Sin autorización: recurso no concedido"
                    },
                    "404": {
                        "description": "No encontrado"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id numérico (> 0). Si no lo es, la API responde 400.",
                        "schema": {
                            "type": "integer",
                            "minimum": 1
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "Clientes"
                ],
                "summary": "Actualizar cliente (PUT — reemplazo)",
                "description": "JWT + RBAC — status no es editable",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Actualizado",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "customer": {
                                            "$ref": "#/components/schemas/Customer"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "id inválido (debe ser un entero positivo)"
                    },
                    "401": {
                        "description": "No autenticado: token ausente o inválido"
                    },
                    "403": {
                        "description": "Sin autorización: recurso no concedido"
                    },
                    "404": {
                        "description": "No encontrado"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id numérico (> 0). Si no lo es, la API responde 400.",
                        "schema": {
                            "type": "integer",
                            "minimum": 1
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CustomerUpdate"
                            }
                        }
                    }
                }
            },
            "patch": {
                "tags": [
                    "Clientes"
                ],
                "summary": "Actualizar cliente (PATCH — parcial)",
                "description": "JWT + RBAC — status no es editable",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Actualizado",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "customer": {
                                            "$ref": "#/components/schemas/Customer"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "id inválido (debe ser un entero positivo)"
                    },
                    "401": {
                        "description": "No autenticado: token ausente o inválido"
                    },
                    "403": {
                        "description": "Sin autorización: recurso no concedido"
                    },
                    "404": {
                        "description": "No encontrado"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id numérico (> 0). Si no lo es, la API responde 400.",
                        "schema": {
                            "type": "integer",
                            "minimum": 1
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CustomerPatch"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "Clientes"
                ],
                "summary": "Eliminar cliente (físico)",
                "description": "JWT + RBAC — borra la fila (también si tiene borrado lógico)",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Eliminado",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string"
                                        },
                                        "id": {
                                            "type": "integer",
                                            "example": 1
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "id inválido (debe ser un entero positivo)"
                    },
                    "401": {
                        "description": "No autenticado: token ausente o inválido"
                    },
                    "403": {
                        "description": "Sin autorización: recurso no concedido"
                    },
                    "404": {
                        "description": "No encontrado"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id numérico (> 0). Si no lo es, la API responde 400.",
                        "schema": {
                            "type": "integer",
                            "minimum": 1
                        }
                    }
                ]
            }
        },
        "/api/customers/{id}/deactivate": {
            "patch": {
                "tags": [
                    "Clientes"
                ],
                "summary": "Eliminar cliente (lógico)",
                "description": "JWT + RBAC — status = inactive",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Desactivado",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string"
                                        },
                                        "customer": {
                                            "$ref": "#/components/schemas/Customer"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "id inválido (debe ser un entero positivo)"
                    },
                    "401": {
                        "description": "No autenticado: token ausente o inválido"
                    },
                    "403": {
                        "description": "Sin autorización: recurso no concedido"
                    },
                    "404": {
                        "description": "No encontrado"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id numérico (> 0). Si no lo es, la API responde 400.",
                        "schema": {
                            "type": "integer",
                            "minimum": 1
                        }
                    }
                ]
            }
        }
    },
    "components": {
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        },
        "schemas": {
            "Customer": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "example": 1
                    },
                    "documentType": {
                        "type": "string",
                        "example": "CC"
                    },
                    "documentNumber": {
                        "type": "string",
                        "example": "1234567890"
                    },
                    "name": {
                        "type": "string",
                        "example": "Ana Pérez"
                    },
                    "phone": {
                        "type": "string",
                        "example": "3001234567"
                    },
                    "email": {
                        "type": "string",
                        "format": "email",
                        "example": "ana.perez@example.com"
                    },
                    "status": {
                        "type": "string",
                        "enum": [
                            "active",
                            "inactive"
                        ],
                        "example": "active"
                    },
                    "createdAt": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "updatedAt": {
                        "type": "string",
                        "format": "date-time"
                    }
                }
            },
            "CustomerCreate": {
                "type": "object",
                "properties": {
                    "documentType": {
                        "type": "string"
                    },
                    "documentNumber": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "phone": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string",
                        "format": "email"
                    },
                    "status": {
                        "type": "string",
                        "enum": [
                            "active",
                            "inactive"
                        ],
                        "default": "active"
                    }
                },
                "required": [
                    "documentType",
                    "documentNumber",
                    "name"
                ]
            },
            "CustomerUpdate": {
                "type": "object",
                "properties": {
                    "documentType": {
                        "type": "string"
                    },
                    "documentNumber": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "phone": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string",
                        "format": "email"
                    }
                },
                "required": [
                    "documentType",
                    "documentNumber",
                    "name"
                ]
            },
            "CustomerPatch": {
                "type": "object",
                "properties": {
                    "documentType": {
                        "type": "string"
                    },
                    "documentNumber": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "phone": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string",
                        "format": "email"
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=customers.swagger.js.map