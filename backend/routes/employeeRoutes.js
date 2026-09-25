const express =require("express");
const router =express.Router();

const {
  createEmployee,
  getEmployees,
   updateEmployee,
   deleteEmployee
} = require("../controllers/employeeController");


router.post("/",createEmployee);
router.get("/",getEmployees);
router.put("/:id", updateEmployee);
router.delete("/:id",deleteEmployee);

module.exports =router;