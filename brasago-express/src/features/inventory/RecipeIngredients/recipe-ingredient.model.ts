import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface RecipeIngredientI {
  id?: number;
  productId: number;
  ingredientId: number;
  quantity: number;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class RecipeIngredient extends Model implements RecipeIngredientI {
  public id!: number;
  public productId!: number;
  public ingredientId!: number;
  public quantity!: number;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RecipeIngredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id",
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "ingredient_id",
    },
    quantity: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "RecipeIngredient",
    tableName: "recipe_ingredients",
    timestamps: true,
  }
);