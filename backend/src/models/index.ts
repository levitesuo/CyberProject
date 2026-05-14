import { sequelize } from "../db.js";
import { User, initUser } from "./User.js";
import { Note, initNote } from "./Note.js";

initUser(sequelize);
initNote(sequelize);

User.hasMany(Note, { foreignKey: "user_id", as: "notes" });
Note.belongsTo(User, { foreignKey: "user_id", as: "user" });

export { sequelize, User, Note };
