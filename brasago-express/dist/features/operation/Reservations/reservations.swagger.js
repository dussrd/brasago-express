"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationsSwagger = void 0;
const bearerSecurity = [{ bearerAuth: [] }];
const unauthorizedResponse = { description: "No autenticado: token ausente o inválido" };
const forbiddenResponse = { description: "Sin autorización: recurso no concedido" };
/**
 * Documentación OpenAPI del feature Reservations.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Modalidad documentada: JWT + RBAC (`authenticate` + `authorize`).
 * Cada operación declara `security`; requiere aplicar estos middlewares en las rutas.
 */
exports.reservationsSwagger = {
    "tags": [
        {
            "name": "Reservas",
            "description": "CRUD de reservas — **JWT + RBAC** (authenticate + authorize)"
        }
    ],
    "paths": {
        "/api/reservations": {
            "get": {
                "tags": [
                    "Reservas"
                ],
                "summary": "Listar reservas activos",
                "description": "JWT + RBAC — retorna registros con status=active",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Lista de reservas",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "reservations": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/components/schemas/Reservation"
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
                    "Reservas"
                ],
                "summary": "Crear reserva",
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
                                        "reservation": {
                                            "$ref": "#/components/schemas/Reservation"
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
                                "$ref": "#/components/schemas/ReservationCreate"
                            }
                        }
                    }
                }
            }
        },
        "/api/reservations/{id}": {
            "get": {
                "tags": [
                    "Reservas"
                ],
                "summary": "Obtener reserva por id",
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
                                        "reservation": {
                                            "$ref": "#/components/schemas/Reservation"
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
                    "Reservas"
                ],
                "summary": "Actualizar reserva (PUT — reemplazo)",
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
                                        "reservation": {
                                            "$ref": "#/components/schemas/Reservation"
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
                                "$ref": "#/components/schemas/ReservationUpdate"
                            }
                        }
                    }
                }
            },
            "patch": {
                "tags": [
                    "Reservas"
                ],
                "summary": "Actualizar reserva (PATCH — parcial)",
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
                                        "reservation": {
                                            "$ref": "#/components/schemas/Reservation"
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
                                "$ref": "#/components/schemas/ReservationPatch"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "Reservas"
                ],
                "summary": "Eliminar reserva (físico)",
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
        "/api/reservations/{id}/deactivate": {
            "patch": {
                "tags": [
                    "Reservas"
                ],
                "summary": "Eliminar reserva (lógico)",
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
                                        "reservation": {
                                            "$ref": "#/components/schemas/Reservation"
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
            "Reservation": {
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
                    "tableId": {
                        "type": "integer",
                        "example": 1
                    },
                    "startDate": {
                        "type": "string",
                        "format": "date-time",
                        "example": "2026-10-05T17:00:00Z"
                    },
                    "endDate": {
                        "type": "string",
                        "format": "date-time",
                        "example": "2026-10-05T18:00:00Z"
                    },
                    "status": {
                        "type": "string",
                        "example": "active",
                        "enum": [
                            "active",
                            "inactive"
                        ]
                    },
                    "observations": {
                        "type": "string",
                        "example": "Reserva para dos personas"
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
            "ReservationCreate": {
                "type": "object",
                "properties": {
                    "customerId": {
                        "type": "integer"
                    },
                    "tableId": {
                        "type": "integer"
                    },
                    "startDate": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "endDate": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "status": {
                        "type": "string",
                        "enum": [
                            "active",
                            "inactive"
                        ],
                        "default": "active"
                    },
                    "observations": {
                        "type": "string"
                    }
                },
                "required": [
                    "customerId",
                    "tableId",
                    "startDate",
                    "endDate"
                ]
            },
            "ReservationUpdate": {
                "type": "object",
                "properties": {
                    "customerId": {
                        "type": "integer"
                    },
                    "tableId": {
                        "type": "integer"
                    },
                    "startDate": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "endDate": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "observations": {
                        "type": "string"
                    }
                },
                "required": [
                    "customerId",
                    "tableId",
                    "startDate",
                    "endDate"
                ]
            },
            "ReservationPatch": {
                "type": "object",
                "properties": {
                    "customerId": {
                        "type": "integer"
                    },
                    "tableId": {
                        "type": "integer"
                    },
                    "startDate": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "endDate": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "observations": {
                        "type": "string"
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=reservations.swagger.js.map