import { sequelize } from "../database/connection.js";
import { Animal } from "./Animal.js";
import { Request } from "./Request.js";
import { Family } from "./Family.js";
import { Association } from "./Association.js";
import { User } from "./User.js";
import { Department } from "./Department.js";

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

Request.belongsTo(Association, {
    as: "association",
    foreignKey: "association_id",
});

Association.hasMany(Request, {
    as: "requests",
    foreignKey: "association_id",
});

User.belongsTo(Family, {
    as: "family",
    foreignKey: "family_id",
});

Family.hasOne(User, {
    as: "user",
    foreignKey: "family_id",
});

User.belongsTo(Association, {
    as: "association",
    foreignKey: "association_id",
});

Association.hasOne(User, {
    as: "user",
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

Family.belongsTo(Department, {
    as: "department",
    foreignKey: "department_id",
});

Department.hasMany(Family, {
    as: "families",
    foreignKey: "department_id",
});

Association.belongsTo(Department, {
    as: "department",
    foreignKey: "department_id",
});

Department.hasMany(Association, {
    as: "associations",
    foreignKey: "department_id",
});

export { sequelize, Animal, Request, Family, Association, User, Department };
