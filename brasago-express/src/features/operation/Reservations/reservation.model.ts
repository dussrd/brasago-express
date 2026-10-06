import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface ReservationI {
  id?: number;
  customerId: number;
  tableId: number;
  startDate: Date;
  endDate: Date;
  status: "active" | "inactive";
  observations?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Reservation extends Model implements ReservationI {
  public id!: number;
  public customerId!: number;
  public tableId!: number;
  public startDate!: Date;
  public endDate!: Date;
  public status!: "active" | "inactive";
  public observations?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Reservation.init(
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
    tableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "table_id",
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "start_date",
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "end_date",
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
    modelName: "Reservation",
    tableName: "reservations",
    timestamps: true,
  }
);