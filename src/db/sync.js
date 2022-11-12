import { Audit, Site, User } from "./models";

User.sync({ force: true })
Site.sync({ force: true })
Audit.sync({ force: true })