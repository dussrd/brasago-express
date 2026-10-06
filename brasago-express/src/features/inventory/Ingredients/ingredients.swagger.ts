const bearerSecurity = [{ bearerAuth: [] }];
const unauthorizedResponse = { description: "No autenticado: token ausente o inválido" };
const forbiddenResponse = { description: "Sin autorización: recurso no concedido" };

/**
 * Documentación OpenAPI del feature Ingredients.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Modalidad documentada: JWT + RBAC (`authenticate` + `authorize`).
 * Cada operación declara `security`; requiere aplicar estos middlewares en las rutas.
 */
export const ingredientsSwagger = {
  "tags": [
    {
      "name": "Ingredientes",
      "description": "CRUD de ingredientes — **JWT + RBAC** (authenticate + authorize)"
    }
  ],
  "paths": {
    "/api/ingredients": {
      "get": {
        "tags": [
          "Ingredientes"
        ],
        "summary": "Listar ingredientes activos",
        "description": "JWT + RBAC — retorna registros con status=active",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de ingredientes",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "ingredients": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Ingredient"
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
          "Ingredientes"
        ],
        "summary": "Crear ingrediente",
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
                    "ingredient": {
                      "$ref": "#/components/schemas/Ingredient"
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
                "$ref": "#/components/schemas/IngredientCreate"
              }
            }
          }
        }
      }
    },
    "/api/ingredients/{id}": {
      "get": {
        "tags": [
          "Ingredientes"
        ],
        "summary": "Obtener ingrediente por id",
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
                    "ingredient": {
                      "$ref": "#/components/schemas/Ingredient"
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
          "Ingredientes"
        ],
        "summary": "Actualizar ingrediente (PUT — reemplazo)",
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
                    "ingredient": {
                      "$ref": "#/components/schemas/Ingredient"
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
                "$ref": "#/components/schemas/IngredientUpdate"
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "Ingredientes"
        ],
        "summary": "Actualizar ingrediente (PATCH — parcial)",
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
                    "ingredient": {
                      "$ref": "#/components/schemas/Ingredient"
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
                "$ref": "#/components/schemas/IngredientPatch"
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Ingredientes"
        ],
        "summary": "Eliminar ingrediente (físico)",
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
    "/api/ingredients/{id}/deactivate": {
      "patch": {
        "tags": [
          "Ingredientes"
        ],
        "summary": "Eliminar ingrediente (lógico)",
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
                    "ingredient": {
                      "$ref": "#/components/schemas/Ingredient"
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
      "Ingredient": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "code": {
            "type": "string",
            "example": "ING-001"
          },
          "name": {
            "type": "string",
            "example": "Tomate"
          },
          "unitOfMeasure": {
            "type": "string",
            "example": "kg"
          },
          "minimumStock": {
            "type": "number",
            "example": 5
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
      "IngredientCreate": {
        "type": "object",
        "properties": {
          "code": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "unitOfMeasure": {
            "type": "string"
          },
          "minimumStock": {
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
          "code",
          "name",
          "unitOfMeasure",
          "minimumStock"
        ]
      },
      "IngredientUpdate": {
        "type": "object",
        "properties": {
          "code": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "unitOfMeasure": {
            "type": "string"
          },
          "minimumStock": {
            "type": "number"
          }
        },
        "required": [
          "code",
          "name",
          "unitOfMeasure",
          "minimumStock"
        ]
      },
      "IngredientPatch": {
        "type": "object",
        "properties": {
          "code": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "unitOfMeasure": {
            "type": "string"
          },
          "minimumStock": {
            "type": "number"
          }
        }
      }
    }
  }
};
