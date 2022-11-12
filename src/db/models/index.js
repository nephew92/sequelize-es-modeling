import Site from "./site";
import User from "./user";

User.init()
Site.init()

User.associate()
Site.associate()

export {
  User,
  Site,
}