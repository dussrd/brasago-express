import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface IngredientI {
  id?: number;
  code: string;
  name: string;
  unitOfMeasure: string;
  minimumStock: number;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Ingredient extends Model implements IngredientI {
  public id!: number;
  public code!: string;
  public name!: string;
  public unitOfMeasure!: string;
  public minimumStock!: number;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitOfMeasure: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "unit_of_measure",
    },
    minimumStock: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: "minimum_stock",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Ingredient",
    tableName: "ingredients",
    timestamps: true,
  }
);