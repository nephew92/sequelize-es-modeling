import { BOOLEAN, INTEGER, Op, STRING, VIRTUAL } from "sequelize";
import BaseModel from "./base";
import Site from "./_site";

export default class User extends BaseModel {
  static get fields() {
    return {
      firstName: STRING,
      lastName: STRING,
      email: STRING,
      active: {
        type: BOOLEAN,
        defaultValue: true,
      }
    }
  }

  static get opts() {
    return {
      ...super.opts,
      scopes: {
        actives: {
          where: {
            active: true
          }
        },
        withSites: {
          include: Site,
          where: {
            siteId: { [Op.not]: null }
          }
        },
        limited: {
          limit: 2
        }
      }
    }
  }

  static associate() {
    Site.hasMany(User)
    User.belongsTo(Site)
  }
}