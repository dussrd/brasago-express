import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface DeliveryDriverI {
  id?: number;
  name: string;
  description?: string;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class DeliveryDriver extends Model implements DeliveryDriverI {
  public id!: number;
  public name!: string;
  public description?: string;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DeliveryDriver.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "DeliveryDriver",
    tableName: "delivery_drivers",
    timestamps: true,
  }
);