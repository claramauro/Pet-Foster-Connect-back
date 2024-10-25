import { sequelize } from "../database/connection.js";
import { Animal } from "./Animal.js";
import { AnimalHasUser } from "./AnimalHasUser.js";
import { Request } from "./Request.js";
import { User } from "./User.js";

Request.belongsTo(Animal, {
    as: "animal",
    foreignKey: "animal_id",
});

Animal.hasMany(Request, {
    as: "requests",
    foreignKey: "animal_id",
});

Request.belongsTo(User, {
    as: "user",
    foreignKey: "user_id",
});

User.hasMany(Request, {
    as: "requests",
    foreignKey: "user_id",
});

User.belongsToMany(Animal, {
    as: "animals",
    through: AnimalHasUser,
    foreignKey: "user_id",
    otherKey: "animal_id",
});

Animal.belongsToMany(User, {
    as: "users",
    through: AnimalHasUser,
    foreignKey: "animal_id",
    otherKey: "user_id",
});

export { sequelize, Animal, AnimalHasUser, Request, User };
