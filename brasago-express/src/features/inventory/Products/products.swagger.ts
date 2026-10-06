const bearerSecurity = [{ bearerAuth: [] }];
const unauthorizedResponse = { description: "No autenticado: token ausente o inválido" };
const forbiddenResponse = { description: "Sin autorización: recurso no concedido" };

/**
 * Documentación OpenAPI del feature Products.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Modalidad documentada: JWT + RBAC (`authenticate` + `authorize`).
 * Cada operación declara `security`; requiere aplicar estos middlewares en las rutas.
 */
export const productsSwagger = {
  "tags": [
    {
      "name": "Productos",
      "description": "CRUD de productos — **JWT + RBAC** (authenticate + authorize)"
    }
  ],
  "paths": {
    "/api/products": {
      "get": {
        "tags": [
          "Productos"
        ],
        "summary": "Listar productos activos",
        "description": "JWT + RBAC — retorna registros con status=active",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de productos",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "products": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Product"
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
          "Productos"
        ],
        "summary": "Crear producto",
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
                    "product": {
                      "$ref": "#/components/schemas/Product"
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
                "$ref": "#/components/schemas/ProductCreate"
              }
            }
          }
        }
      }
    },
    "/api/products/{id}": {
      "get": {
        "tags": [
          "Productos"
        ],
        "summary": "Obtener producto por id",
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
                    "product": {
                      "$ref": "#/components/schemas/Product"
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
          "Productos"
        ],
        "summary": "Actualizar producto (PUT — reemplazo)",
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
                    "product": {
                      "$ref": "#/components/schemas/Product"
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
                "$ref": "#/components/schemas/ProductUpdate"
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "Productos"
        ],
        "summary": "Actualizar producto (PATCH — parcial)",
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
                    "product": {
                      "$ref": "#/components/schemas/Product"
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
                "$ref": "#/components/schemas/ProductPatch"
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Productos"
        ],
        "summary": "Eliminar producto (físico)",
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
    "/api/products/{id}/deactivate": {
      "patch": {
        "tags": [
          "Productos"
        ],
        "summary": "Eliminar producto (lógico)",
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
                    "product": {
                      "$ref": "#/components/schemas/Product"
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
      "Product": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "sku": {
            "type": "string",
            "example": "PROD-001"
          },
          "name": {
            "type": "string",
            "example": "Hamburguesa clásica"
          },
          "description": {
            "type": "string",
            "example": "Hamburguesa con tomate"
          },
          "price": {
            "type": "number",
            "example": 12500
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
      "ProductCreate": {
        "type": "object",
        "properties": {
          "sku": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "price": {
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
          "sku",
          "name",
          "price"
        ]
      },
      "ProductUpdate": {
        "type": "object",
        "properties": {
          "sku": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "price": {
            "type": "number"
          }
        },
        "required": [
          "sku",
          "name",
          "price"
        ]
      },
      "ProductPatch": {
        "type": "object",
        "properties": {
          "sku": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "price": {
            "type": "number"
          }
        }
      }
    }
  }
};
