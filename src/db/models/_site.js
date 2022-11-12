import { STRING } from "sequelize";
import BaseModel from "./base";

export default class Site extends BaseModel {
  static get fields() {
    return {
      title: STRING,
    }
  }

  static associate() { }

  static get opts() {
    return {
      ...super.opts,
      name: {
        plural: 'sites',
        singular: 'site',
      }
    }
  }

}