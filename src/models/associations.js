import { sequelize } from "../database/connection.js";
import { Animal } from "./Animal.js";
import { Request } from "./Request.js";
import { Family } from "./Family.js";
import { Association } from "./Association";
import { User } from "./User.js";

Request.belongsTo(Animal, {
    as: "animal",
    foreignKey: "animal_id",
});

Animal.hasMany(Request, {
    as: "requests",
    foreignKey: "animal_id",
});

Request.belongsTo(Family, {
    as: "family",
    foreignKey: "family_id",
});

Family.hasMany(Request, {
    as: "requests",
    foreignKey: "family_id",
});

Family.belongsTo(User, {
    as: "user",
    foreignKey: "family_id",
});

User.hasOne(Family, {
    as: "families",
    foreignKey: "family_id",
});

Association.belongsTo(User, {
    as: "user",
    foreignKey: "association_id",
});

User.hasOne(Association, {
    as: "associations",
    foreignKey: "association_id",
});

Animal.belongsTo(Family, {
    as: "family",
    foreignKey: "family_id",
});

Family.hasMany(Animal, {
    as: "animals",
    foreignKey: "family_id",
});

Animal.belongsTo(Association, {
    as: "association",
    foreignKey: "association_id",
});

Association.hasMany(Animal, {
    as: "animals",
    foreignKey: "association_id",
});

export { sequelize, Animal, Request, Family, Association, User };
