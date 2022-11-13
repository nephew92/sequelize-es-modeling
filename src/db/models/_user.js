import { BOOLEAN, Op, STRING, VIRTUAL } from "sequelize";
import BaseModel from "./base";
import Site from "./_site";

export default class User extends BaseModel {
  static fields = {
    firstName: STRING,
    lastName: STRING,
    email: STRING,
    fullName: {
      type: VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`
      }
    },
    active: {
      type: BOOLEAN,
      defaultValue: true,
    }
  };

  static scopes = {
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
  };

  static associate() {
    Site.hasMany(User)
    User.belongsTo(Site)
  }
}