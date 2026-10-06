"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryDriversSwagger = void 0;
const bearerSecurity = [{ bearerAuth: [] }];
const unauthorizedResponse = { description: "No autenticado: token ausente o inválido" };
const forbiddenResponse = { description: "Sin autorización: recurso no concedido" };
/**
 * Documentación OpenAPI del feature DeliveryDrivers.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Modalidad documentada: JWT + RBAC (`authenticate` + `authorize`).
 * Cada operación declara `security`; requiere aplicar estos middlewares en las rutas.
 */
exports.deliveryDriversSwagger = {
    "tags": [
        {
            "name": "Repartidores",
            "description": "CRUD de repartidores — **JWT + RBAC** (authenticate + authorize)"
        }
    ],
    "paths": {
        "/api/delivery-drivers": {
            "get": {
                "tags": [
                    "Repartidores"
                ],
                "summary": "Listar repartidores activos",
                "description": "JWT + RBAC — retorna registros con status=active",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Lista de repartidores",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "deliveryDrivers": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/components/schemas/DeliveryDriver"
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
                    "Repartidores"
                ],
                "summary": "Crear repartidor",
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
                                        "deliveryDriver": {
                                            "$ref": "#/components/schemas/DeliveryDriver"
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
                                "$ref": "#/components/schemas/DeliveryDriverCreate"
                            }
                        }
                    }
                }
            }
        },
        "/api/delivery-drivers/{id}": {
            "get": {
                "tags": [
                    "Repartidores"
                ],
                "summary": "Obtener repartidor por id",
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
                                        "deliveryDriver": {
                                            "$ref": "#/components/schemas/DeliveryDriver"
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
                    "Repartidores"
                ],
                "summary": "Actualizar repartidor (PUT — reemplazo)",
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
                                        "deliveryDriver": {
                                            "$ref": "#/components/schemas/DeliveryDriver"
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
                                "$ref": "#/components/schemas/DeliveryDriverUpdate"
                            }
                        }
                    }
                }
            },
            "patch": {
                "tags": [
                    "Repartidores"
                ],
                "summary": "Actualizar repartidor (PATCH — parcial)",
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
                                        "deliveryDriver": {
                                            "$ref": "#/components/schemas/DeliveryDriver"
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
                                "$ref": "#/components/schemas/DeliveryDriverPatch"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "Repartidores"
                ],
                "summary": "Eliminar repartidor (físico)",
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
        "/api/delivery-drivers/{id}/deactivate": {
            "patch": {
                "tags": [
                    "Repartidores"
                ],
                "summary": "Eliminar repartidor (lógico)",
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
                                        "deliveryDriver": {
                                            "$ref": "#/components/schemas/DeliveryDriver"
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
            "DeliveryDriver": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "example": 1
                    },
                    "name": {
                        "type": "string",
                        "example": "Carlos López"
                    },
                    "description": {
                        "type": "string",
                        "example": "Repartidor de la sucursal Centro"
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
            "DeliveryDriverCreate": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "description": {
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
                    "name"
                ]
            },
            "DeliveryDriverUpdate": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    }
                },
                "required": [
                    "name"
                ]
            },
            "DeliveryDriverPatch": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=delivery-drivers.swagger.js.map