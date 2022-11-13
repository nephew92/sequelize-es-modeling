import { sequelize } from "./base";
import Audit from "./_audit";
import Site from "./_site";
import User from "./_user";

sequelize.initModels(User, Site, Audit)

Audit.listen(User, Site)

export {
  User,
  Site,
  Audit,
}