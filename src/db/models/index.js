import Site from "./_site";
import User from "./_user";

User.init()
Site.init()

User.associate()
Site.associate()

export {
  User,
  Site,
}