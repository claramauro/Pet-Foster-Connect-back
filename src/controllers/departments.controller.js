import { Department } from "../models/associations.js";

const departmentsController = {
    index: async (req, res) => {
        const departments = await Department.findAll();
        res.json(departments);
    },
};

export { departmentsController };
