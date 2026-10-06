"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersSwagger = void 0;
const bearerSecurity = [{ bearerAuth: [] }];
const unauthorizedResponse = { description: "No autenticado: token ausente o inválido" };
const forbiddenResponse = { description: "Sin autorización: recurso no concedido" };
/**
 * Documentación OpenAPI del feature Orders.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Modalidad documentada: JWT + RBAC (`authenticate` + `authorize`).
 * Cada operación declara `security`; requiere aplicar estos middlewares en las rutas.
 */
exports.ordersSwagger = {
    "tags": [
        {
            "name": "Pedidos",
            "description": "CRUD de pedidos — **JWT + RBAC** (authenticate + authorize)"
        }
    ],
    "paths": {
        "/api/orders": {
            "get": {
                "tags": [
                    "Pedidos"
                ],
                "summary": "Listar pedidos activos",
                "description": "JWT + RBAC — retorna registros con status=active",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Lista de pedidos",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "orders": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/components/schemas/Order"
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
                    "Pedidos"
                ],
                "summary": "Crear pedido",
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
                                        "order": {
                                            "$ref": "#/components/schemas/Order"
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
                                "$ref": "#/components/schemas/OrderCreate"
                            }
                        }
                    }
                }
            }
        },
        "/api/orders/{id}": {
            "get": {
                "tags": [
                    "Pedidos"
                ],
                "summary": "Obtener pedido por id",
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
                                        "order": {
                                            "$ref": "#/components/schemas/Order"
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
                    "Pedidos"
                ],
                "summary": "Actualizar pedido (PUT — reemplazo)",
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
                                        "order": {
                                            "$ref": "#/components/schemas/Order"
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
                                "$ref": "#/components/schemas/OrderUpdate"
                            }
                        }
                    }
                }
            },
            "patch": {
                "tags": [
                    "Pedidos"
                ],
                "summary": "Actualizar pedido (PATCH — parcial)",
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
                                        "order": {
                                            "$ref": "#/components/schemas/Order"
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
                                "$ref": "#/components/schemas/OrderPatch"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "Pedidos"
                ],
                "summary": "Eliminar pedido (físico)",
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
        "/api/orders/{id}/deactivate": {
            "patch": {
                "tags": [
                    "Pedidos"
                ],
                "summary": "Eliminar pedido (lógico)",
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
                                        "order": {
                                            "$ref": "#/components/schemas/Order"
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
            "Order": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "example": 1
                    },
                    "customerId": {
                        "type": "integer",
                        "example": 1
                    },
                    "branchId": {
                        "type": "integer",
                        "example": 1
                    },
                    "channel": {
                        "type": "string",
                        "example": "table"
                    },
                    "date": {
                        "type": "string",
                        "format": "date-time",
                        "example": "2026-10-05T15:00:00Z"
                    },
                    "subtotal": {
                        "type": "number",
                        "example": 25000
                    },
                    "total": {
                        "type": "number",
                        "example": 25000
                    },
                    "status": {
                        "type": "string",
                        "example": "active",
                        "enum": [
                            "active",
                            "inactive"
                        ]
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
            "OrderCreate": {
                "type": "object",
                "properties": {
                    "customerId": {
                        "type": "integer"
                    },
                    "branchId": {
                        "type": "integer"
                    },
                    "channel": {
                        "type": "string"
                    },
                    "date": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "subtotal": {
                        "type": "number"
                    },
                    "total": {
                        "type": "number"
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
                    "customerId",
                    "branchId",
                    "channel",
                    "date",
                    "subtotal",
                    "total"
                ]
            },
            "OrderUpdate": {
                "type": "object",
                "properties": {
                    "customerId": {
                        "type": "integer"
                    },
                    "branchId": {
                        "type": "integer"
                    },
                    "channel": {
                        "type": "string"
                    },
                    "date": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "subtotal": {
                        "type": "number"
                    },
                    "total": {
                        "type": "number"
                    }
                },
                "required": [
                    "customerId",
                    "branchId",
                    "channel",
                    "date",
                    "subtotal",
                    "total"
                ]
            },
            "OrderPatch": {
                "type": "object",
                "properties": {
                    "customerId": {
                        "type": "integer"
                    },
                    "branchId": {
                        "type": "integer"
                    },
                    "channel": {
                        "type": "string"
                    },
                    "date": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "subtotal": {
                        "type": "number"
                    },
                    "total": {
                        "type": "number"
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=orders.swagger.js.map