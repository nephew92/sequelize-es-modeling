import { INTEGER, STRING } from "sequelize";
import BaseModel from "./base";

export default class User extends BaseModel {
  static get fields() {
    return {
      firstName: STRING,
      lastName: STRING,
      email: STRING,
    }
  }
}