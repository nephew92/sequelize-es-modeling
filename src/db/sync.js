import { Site, User } from "./models";

User.sync({ force: true })
Site.sync({ force: true })