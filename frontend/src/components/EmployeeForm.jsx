import { useState, useEffect } from "react";
import "../css/EmployeeForm.css";

const EmployeeForm = ({ editEmployee, setEditEmployee, refreshEmployees }) => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    role: "",
    salary: "",
    joinDate: "",
  });

  useEffect(() => {
    if (editEmployee) {
      setFormData({
        name: editEmployee.name,
        department: editEmployee.department,
        role: editEmployee.role,
        salary: editEmployee.salary,
        joinDate: editEmployee.joinDate.split("T")[0],
      });
    }
  }, [editEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.name.trim() === "" ||
      formData.department.trim() === "" ||
      formData.role.trim() === "" ||
      formData.salary === "" ||
      formData.joinDate === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.salary <= 0) {
      alert("Salary must be greater than 0");
      return;
    }

    if (editEmployee) {
      const response = await fetch(
        `https://employee-management-system-1-n0rv.onrender.com/api/employees/${editEmployee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        alert("Employee updated successfully");

        setFormData({
          name: "",
          department: "",
          role: "",
          salary: "",
          joinDate: "",
        });

        setEditEmployee(null);
        refreshEmployees();
      } else {
        alert("Update failed");
      }

      return;
    }
    const response = await fetch(
      "https://employee-management-system-1-n0rv.onrender.com/api/employees",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    if (response.ok) {
      alert("Employee added successfully");

      setFormData({
        name: "",
        department: "",
        role: "",
        salary: "",
        joinDate: "",
      });

      refreshEmployees();
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>{editEmployee ? "Edit Employee" : "Add Employee"}</h2>

      <div className="form-group">
        <label>Employee Name</label>

        <input
          type="text"
          placeholder="Enter employee name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Department</label>

        <input
          type="text"
          placeholder="Enter department"
          value={formData.department}
          onChange={(e) =>
            setFormData({
              ...formData,
              department: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Role</label>

        <input
          type="text"
          placeholder="Enter role"
          value={formData.role}
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Salary</label>

        <input
          type="number"
          placeholder="Enter salary"
          value={formData.salary}
          onChange={(e) =>
            setFormData({
              ...formData,
              salary: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Join Date</label>

        <input
          type="date"
          value={formData.joinDate}
          onChange={(e) =>
            setFormData({
              ...formData,
              joinDate: e.target.value,
            })
          }
        />
      </div>

      <button type="submit" className="submit-btn">
        {editEmployee ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
