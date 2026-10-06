import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface CustomerI {
  id?: number;
  documentType: string;
  documentNumber: string;
  name: string;
  phone?: string;
  email?: string;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Customer extends Model implements CustomerI {
  public id!: number;
  public documentType!: string;
  public documentNumber!: string;
  public name!: string;
  public phone?: string;
  public email?: string;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    documentType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "document_type",
    },
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "document_number",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: { msg: "Email must be a valid email address" },
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Customer",
    tableName: "customers",
    timestamps: true,
  }
);