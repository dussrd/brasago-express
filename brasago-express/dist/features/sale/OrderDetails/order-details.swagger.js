"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDetailsSwagger = void 0;
const bearerSecurity = [{ bearerAuth: [] }];
const unauthorizedResponse = { description: "No autenticado: token ausente o inválido" };
const forbiddenResponse = { description: "Sin autorización: recurso no concedido" };
/**
 * Documentación OpenAPI del feature OrderDetails.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Modalidad documentada: JWT + RBAC (`authenticate` + `authorize`).
 * Cada operación declara `security`; requiere aplicar estos middlewares en las rutas.
 */
exports.orderDetailsSwagger = {
    "tags": [
        {
            "name": "Detalles de pedidos",
            "description": "CRUD de detalles de pedidos — **JWT + RBAC** (authenticate + authorize)"
        }
    ],
    "paths": {
        "/api/order-details": {
            "get": {
                "tags": [
                    "Detalles de pedidos"
                ],
                "summary": "Listar detalles de pedidos activos",
                "description": "JWT + RBAC — retorna registros con status=active",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Lista de detalles de pedidos",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "orderDetails": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/components/schemas/OrderDetail"
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
                    "Detalles de pedidos"
                ],
                "summary": "Crear detalle de pedido",
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
                                        "orderDetail": {
                                            "$ref": "#/components/schemas/OrderDetail"
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
                                "$ref": "#/components/schemas/OrderDetailCreate"
                            }
                        }
                    }
                }
            }
        },
        "/api/order-details/{id}": {
            "get": {
                "tags": [
                    "Detalles de pedidos"
                ],
                "summary": "Obtener detalle de pedido por id",
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
                                        "orderDetail": {
                                            "$ref": "#/components/schemas/OrderDetail"
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
                    "Detalles de pedidos"
                ],
                "summary": "Actualizar detalle de pedido (PUT — reemplazo)",
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
                                        "orderDetail": {
                                            "$ref": "#/components/schemas/OrderDetail"
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
                                "$ref": "#/components/schemas/OrderDetailUpdate"
                            }
                        }
                    }
                }
            },
            "patch": {
                "tags": [
                    "Detalles de pedidos"
                ],
                "summary": "Actualizar detalle de pedido (PATCH — parcial)",
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
                                        "orderDetail": {
                                            "$ref": "#/components/schemas/OrderDetail"
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
                                "$ref": "#/components/schemas/OrderDetailPatch"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "Detalles de pedidos"
                ],
                "summary": "Eliminar detalle de pedido (físico)",
                "description": "JWT + RBAC — borra la fila",
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
        "/api/order-details/{id}/deactivate": {
            "patch": {
                "tags": [
                    "Detalles de pedidos"
                ],
                "summary": "Eliminar detalle de pedido (lógico)",
                "description": "JWT + RBAC — status = inactive",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
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
                                        "orderDetail": {
                                            "$ref": "#/components/schemas/OrderDetail"
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
                }
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
            "OrderDetail": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "example": 1
                    },
                    "orderId": {
                        "type": "integer",
                        "example": 1
                    },
                    "productId": {
                        "type": "integer",
                        "example": 1
                    },
                    "quantity": {
                        "type": "integer",
                        "example": 2
                    },
                    "unitValue": {
                        "type": "number",
                        "example": 12500
                    },
                    "total": {
                        "type": "number",
                        "example": 25000
                    },
                    "observations": {
                        "type": "string",
                        "example": "Sin cebolla"
                    },
                    "createdAt": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "updatedAt": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "status": {
                        "type": "string",
                        "enum": [
                            "active",
                            "inactive"
                        ],
                        "example": "active"
                    }
                }
            },
            "OrderDetailCreate": {
                "type": "object",
                "properties": {
                    "orderId": {
                        "type": "integer"
                    },
                    "productId": {
                        "type": "integer"
                    },
                    "quantity": {
                        "type": "integer"
                    },
                    "unitValue": {
                        "type": "number"
                    },
                    "total": {
                        "type": "number"
                    },
                    "observations": {
                        "type": "string"
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
                    "orderId",
                    "productId",
                    "quantity",
                    "unitValue",
                    "total"
                ]
            },
            "OrderDetailUpdate": {
                "type": "object",
                "properties": {
                    "orderId": {
                        "type": "integer"
                    },
                    "productId": {
                        "type": "integer"
                    },
                    "quantity": {
                        "type": "integer"
                    },
                    "unitValue": {
                        "type": "number"
                    },
                    "total": {
                        "type": "number"
                    },
                    "observations": {
                        "type": "string"
                    }
                },
                "required": [
                    "orderId",
                    "productId",
                    "quantity",
                    "unitValue",
                    "total"
                ]
            },
            "OrderDetailPatch": {
                "type": "object",
                "properties": {
                    "orderId": {
                        "type": "integer"
                    },
                    "productId": {
                        "type": "integer"
                    },
                    "quantity": {
                        "type": "integer"
                    },
                    "unitValue": {
                        "type": "number"
                    },
                    "total": {
                        "type": "number"
                    },
                    "observations": {
                        "type": "string"
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=order-details.swagger.js.map