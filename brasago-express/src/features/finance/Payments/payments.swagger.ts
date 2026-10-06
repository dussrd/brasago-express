const bearerSecurity = [{ bearerAuth: [] }];
const unauthorizedResponse = { description: "No autenticado: token ausente o inválido" };
const forbiddenResponse = { description: "Sin autorización: recurso no concedido" };

/**
 * Documentación OpenAPI del feature Payments.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Modalidad documentada: JWT + RBAC (`authenticate` + `authorize`).
 * Cada operación declara `security`; requiere aplicar estos middlewares en las rutas.
 */
export const paymentsSwagger = {
  "tags": [
    {
      "name": "Pagos",
      "description": "CRUD de pagos — **JWT + RBAC** (authenticate + authorize)"
    }
  ],
  "paths": {
    "/api/payments": {
      "get": {
        "tags": [
          "Pagos"
        ],
        "summary": "Listar pagos activos",
        "description": "JWT + RBAC — retorna registros con status=active",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de pagos",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "payments": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Payment"
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
          "Pagos"
        ],
        "summary": "Crear pago",
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
                    "payment": {
                      "$ref": "#/components/schemas/Payment"
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
                "$ref": "#/components/schemas/PaymentCreate"
              }
            }
          }
        }
      }
    },
    "/api/payments/{id}": {
      "get": {
        "tags": [
          "Pagos"
        ],
        "summary": "Obtener pago por id",
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
                    "payment": {
                      "$ref": "#/components/schemas/Payment"
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
          "Pagos"
        ],
        "summary": "Actualizar pago (PUT — reemplazo)",
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
                    "payment": {
                      "$ref": "#/components/schemas/Payment"
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
                "$ref": "#/components/schemas/PaymentUpdate"
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "Pagos"
        ],
        "summary": "Actualizar pago (PATCH — parcial)",
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
                    "payment": {
                      "$ref": "#/components/schemas/Payment"
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
                "$ref": "#/components/schemas/PaymentPatch"
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Pagos"
        ],
        "summary": "Eliminar pago (físico)",
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
    "/api/payments/{id}/deactivate": {
      "patch": {
        "tags": [
          "Pagos"
        ],
        "summary": "Eliminar pago (lógico)",
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
                    "payment": {
                      "$ref": "#/components/schemas/Payment"
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
      "Payment": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "referenceType": {
            "type": "string",
            "example": "order"
          },
          "referenceId": {
            "type": "integer",
            "example": 1
          },
          "method": {
            "type": "string",
            "example": "cash"
          },
          "amount": {
            "type": "number",
            "example": 25000
          },
          "date": {
            "type": "string",
            "format": "date-time",
            "example": "2026-10-05T15:00:00Z"
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
      "PaymentCreate": {
        "type": "object",
        "properties": {
          "referenceType": {
            "type": "string"
          },
          "referenceId": {
            "type": "integer"
          },
          "method": {
            "type": "string"
          },
          "amount": {
            "type": "number"
          },
          "date": {
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
          }
        },
        "required": [
          "referenceType",
          "referenceId",
          "method",
          "amount",
          "date"
        ]
      },
      "PaymentUpdate": {
        "type": "object",
        "properties": {
          "referenceType": {
            "type": "string"
          },
          "referenceId": {
            "type": "integer"
          },
          "method": {
            "type": "string"
          },
          "amount": {
            "type": "number"
          },
          "date": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "referenceType",
          "referenceId",
          "method",
          "amount",
          "date"
        ]
      },
      "PaymentPatch": {
        "type": "object",
        "properties": {
          "referenceType": {
            "type": "string"
          },
          "referenceId": {
            "type": "integer"
          },
          "method": {
            "type": "string"
          },
          "amount": {
            "type": "number"
          },
          "date": {
            "type": "string",
            "format": "date-time"
          }
        }
      }
    }
  }
};
