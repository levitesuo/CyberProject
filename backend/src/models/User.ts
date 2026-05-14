import {
  Model,
  DataTypes,
  type Sequelize,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "sequelize";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
}

export const initUser = (sequelize: Sequelize): void => {
  User.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.TEXT, allowNull: false, unique: true },
      password: { type: DataTypes.TEXT, allowNull: false },
    },
    { sequelize, tableName: "users", timestamps: false },
  );
};
