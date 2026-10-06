import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface OrderI {
  id?: number;
  customerId: number;
  branchId: number;
  channel: string;
  date: Date;
  subtotal: number;
  total: number;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Order extends Model implements OrderI {
  public id!: number;
  public customerId!: number;
  public branchId!: number;
  public channel!: string;
  public date!: Date;
  public subtotal!: number;
  public total!: number;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "customer_id",
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "branch_id",
    },
    channel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
  }
);