import { STRING } from "sequelize";
import BaseModel from "./base";

export default class Site extends BaseModel {
  static get fields() {
    return {
      title: STRING,
    }
  }
}