const bearerSecurity = [{ bearerAuth: [] }];
const unauthorizedResponse = { description: "No autenticado: token ausente o inválido" };
const forbiddenResponse = { description: "Sin autorización: recurso no concedido" };

/**
 * Documentación OpenAPI del feature RecipeIngredients.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Modalidad documentada: JWT + RBAC (`authenticate` + `authorize`).
 * Cada operación declara `security`; requiere aplicar estos middlewares en las rutas.
 */
export const recipeIngredientsSwagger = {
  "tags": [
    {
      "name": "Ingredientes de recetas",
      "description": "CRUD de ingredientes de recetas — **JWT + RBAC** (authenticate + authorize)"
    }
  ],
  "paths": {
    "/api/recipe-ingredients": {
      "get": {
        "tags": [
          "Ingredientes de recetas"
        ],
        "summary": "Listar ingredientes de recetas activos",
        "description": "JWT + RBAC — retorna registros con status=active",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de ingredientes de recetas",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "recipeIngredients": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/RecipeIngredient"
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
          "Ingredientes de recetas"
        ],
        "summary": "Crear ingrediente de receta",
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
                    "recipeIngredient": {
                      "$ref": "#/components/schemas/RecipeIngredient"
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
                "$ref": "#/components/schemas/RecipeIngredientCreate"
              }
            }
          }
        }
      }
    },
    "/api/recipe-ingredients/{id}": {
      "get": {
        "tags": [
          "Ingredientes de recetas"
        ],
        "summary": "Obtener ingrediente de receta por id",
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
                    "recipeIngredient": {
                      "$ref": "#/components/schemas/RecipeIngredient"
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
          "Ingredientes de recetas"
        ],
        "summary": "Actualizar ingrediente de receta (PUT — reemplazo)",
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
                    "recipeIngredient": {
                      "$ref": "#/components/schemas/RecipeIngredient"
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
                "$ref": "#/components/schemas/RecipeIngredientUpdate"
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "Ingredientes de recetas"
        ],
        "summary": "Actualizar ingrediente de receta (PATCH — parcial)",
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
                    "recipeIngredient": {
                      "$ref": "#/components/schemas/RecipeIngredient"
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
                "$ref": "#/components/schemas/RecipeIngredientPatch"
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Ingredientes de recetas"
        ],
        "summary": "Eliminar ingrediente de receta (físico)",
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
    "/api/recipe-ingredients/{id}/deactivate": {
      "patch": {
        "tags": [
          "Ingredientes de recetas"
        ],
        "summary": "Eliminar ingrediente de receta (lógico)",
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
                    "recipeIngredient": {
                      "$ref": "#/components/schemas/RecipeIngredient"
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
      "RecipeIngredient": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "productId": {
            "type": "integer",
            "example": 1
          },
          "ingredientId": {
            "type": "integer",
            "example": 1
          },
          "quantity": {
            "type": "number",
            "example": 0.1
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
      "RecipeIngredientCreate": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "integer"
          },
          "ingredientId": {
            "type": "integer"
          },
          "quantity": {
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
          "productId",
          "ingredientId",
          "quantity"
        ]
      },
      "RecipeIngredientUpdate": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "integer"
          },
          "ingredientId": {
            "type": "integer"
          },
          "quantity": {
            "type": "number"
          }
        },
        "required": [
          "productId",
          "ingredientId",
          "quantity"
        ]
      },
      "RecipeIngredientPatch": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "integer"
          },
          "ingredientId": {
            "type": "integer"
          },
          "quantity": {
            "type": "number"
          }
        }
      }
    }
  }
};
