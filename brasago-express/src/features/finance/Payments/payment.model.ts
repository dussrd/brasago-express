import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface PaymentI {
  id?: number;
  referenceType: string;
  referenceId: number;
  method: string;
  amount: number;
  date: Date;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payment extends Model implements PaymentI {
  public id!: number;
  public referenceType!: string;
  public referenceId!: number;
  public method!: string;
  public amount!: number;
  public date!: Date;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    referenceType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "reference_type",
    },
    referenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "reference_id",
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
  }
);