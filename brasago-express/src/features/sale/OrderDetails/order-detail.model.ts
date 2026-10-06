import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

/** Detalle N:M Order ↔ Product. unitValue conserva el precio al vender; total = quantity × unitValue. */
export interface OrderDetailI {
  id?: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitValue: number;
  total: number;
  observations?: string;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class OrderDetail extends Model implements OrderDetailI {
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
  public unitValue!: number;
  public total!: number;
  public observations?: string;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "order_id",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitValue: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: "unit_value",
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
    modelName: "OrderDetail",
    tableName: "order_details",
    timestamps: true,
  }
);