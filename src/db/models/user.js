import { INTEGER, STRING } from "sequelize";
import BaseModel from "./base";
import Site from "./site";

export default class User extends BaseModel {
  static get fields() {
    return {
      firstName: STRING,
      lastName: STRING,
      email: STRING,
    }
  }

  static associate() {
    Site.hasMany(User)
    User.belongsTo(Site)
  }
}