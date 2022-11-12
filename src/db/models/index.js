import Audit from "./_audit";
import Site from "./_site";
import User from "./_user";

User.init()
Site.init()
Audit.init()

User.associate()
Site.associate()
Audit.associate()

Audit.listen(User)
Audit.listen(Site)

export {
  User,
  Site,
  Audit,
}