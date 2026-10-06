const bearerSecurity = [{ bearerAuth: [] }];
const unauthorizedResponse = { description: "No autenticado: token ausente o inválido" };
const forbiddenResponse = { description: "Sin autorización: recurso no concedido" };

/**
 * Documentación OpenAPI del feature Tables.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Modalidad documentada: JWT + RBAC (`authenticate` + `authorize`).
 * Cada operación declara `security`; requiere aplicar estos middlewares en las rutas.
 */
export const tablesSwagger = {
  "tags": [
    {
      "name": "Mesas",
      "description": "CRUD de mesas — **JWT + RBAC** (authenticate + authorize)"
    }
  ],
  "paths": {
    "/api/tables": {
      "get": {
        "tags": [
          "Mesas"
        ],
        "summary": "Listar mesas activos",
        "description": "JWT + RBAC — retorna registros con status=active",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de mesas",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "tables": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Table"
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
          "Mesas"
        ],
        "summary": "Crear mesa",
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
                    "table": {
                      "$ref": "#/components/schemas/Table"
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
                "$ref": "#/components/schemas/TableCreate"
              }
            }
          }
        }
      }
    },
    "/api/tables/{id}": {
      "get": {
        "tags": [
          "Mesas"
        ],
        "summary": "Obtener mesa por id",
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
                    "table": {
                      "$ref": "#/components/schemas/Table"
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
          "Mesas"
        ],
        "summary": "Actualizar mesa (PUT — reemplazo)",
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
                    "table": {
                      "$ref": "#/components/schemas/Table"
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
                "$ref": "#/components/schemas/TableUpdate"
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "Mesas"
        ],
        "summary": "Actualizar mesa (PATCH — parcial)",
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
                    "table": {
                      "$ref": "#/components/schemas/Table"
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
                "$ref": "#/components/schemas/TablePatch"
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Mesas"
        ],
        "summary": "Eliminar mesa (físico)",
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
    "/api/tables/{id}/deactivate": {
      "patch": {
        "tags": [
          "Mesas"
        ],
        "summary": "Eliminar mesa (lógico)",
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
                    "table": {
                      "$ref": "#/components/schemas/Table"
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
      "Table": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "branchId": {
            "type": "integer",
            "example": 1
          },
          "name": {
            "type": "string",
            "example": "Mesa 1"
          },
          "description": {
            "type": "string",
            "example": "Mesa para dos personas"
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
      "TableCreate": {
        "type": "object",
        "properties": {
          "branchId": {
            "type": "integer"
          },
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
          "branchId",
          "name"
        ]
      },
      "TableUpdate": {
        "type": "object",
        "properties": {
          "branchId": {
            "type": "integer"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          }
        },
        "required": [
          "branchId",
          "name"
        ]
      },
      "TablePatch": {
        "type": "object",
        "properties": {
          "branchId": {
            "type": "integer"
          },
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
