const Employee = require("../models/employe-model.js");

const createEmployee = async (req, res) => {
  try {
    const { name, department, role, salary, joinDate } = req.body;
    const employee = await Employee.create({
      name,
      department,
      role,
      salary,
      joinDate,
    });
    res.status(201).json({
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create employee",
      error: error.message,
    });
  }
};

const getEmployees =async (req,res) =>{
    try {
        const employees = await Employee.find();

        res.status(200).json({
            message:"employees fetch successfully",
            employees
        })
    } catch (error) {
        res.status(500).json({
            message:"failed to fetch employees",
            error:error.message
        })
    }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, department, role, salary, joinDate } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        department,
        role,
        salary,
        joinDate
      },
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update employee",
      error: error.message
    });
  }
};

const deleteEmployee =async (req,res) =>{
    try {
        
        const {id} =req.params;

        const employee =await Employee.findByIdAndDelete(id);

        if(!employee){
            return res.status(404).json({
                message:"Employee not found"
            });
        }

        res.status(200).json({
            message:"Employee deleted successfully",
            employee
        })
    } catch (error) {
        res.status(500).json({
      message: "Failed to delete employee",
      error: error.message
    });
    }
}

module.exports =  {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
};
