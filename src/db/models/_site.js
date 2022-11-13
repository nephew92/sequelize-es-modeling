import { STRING } from "sequelize";
import BaseModel from "./base";

export default class Site extends BaseModel {
  static fields = {
    title: STRING,
  };
}