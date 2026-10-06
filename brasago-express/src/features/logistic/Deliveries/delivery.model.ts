import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface DeliveryI {
  id?: number;
  orderId: number;
  deliveryDriverId: number;
  startDate: Date;
  endDate?: Date;
  total: number;
  status: "active" | "inactive";
  observations?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Delivery extends Model implements DeliveryI {
  public id!: number;
  public orderId!: number;
  public deliveryDriverId!: number;
  public startDate!: Date;
  public endDate?: Date;
  public total!: number;
  public status!: "active" | "inactive";
  public observations?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Delivery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: "order_id",
    },
    deliveryDriverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "delivery_driver_id",
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "start_date",
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "end_date",
    },
    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
      allowNull: false,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Delivery",
    tableName: "deliveries",
    timestamps: true,
  }
);