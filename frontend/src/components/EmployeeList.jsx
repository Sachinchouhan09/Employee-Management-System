import "../css/EmployeeList.css";
import { useState, useEffect } from "react";

const EmployeeList = ({ setEditEmployee, refresh }) => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(
      "https://employee-management-system-production-87cf.up.railway.app/api/employees"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        return response.json();
      })
      .then((data) => {
        setEmployees(data.employees);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [refresh]);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase())
  );

  if (sortBy === "name") {
    filteredEmployees.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortBy === "department") {
    filteredEmployees.sort((a, b) =>
      a.department.localeCompare(b.department)
    );
  }

  if (sortBy === "salary") {
    filteredEmployees.sort((a, b) => a.salary - b.salary);
  }

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `https://employee-management-system-production-87cf.up.railway.app/api/employees/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      alert("Employee deleted successfully");

      setEmployees(
        employees.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="employee-list">
      <div className="list-header">
        <div>
          <h2>Employee List</h2>
          <p>View and manage all employees</p>
        </div>

        <div className="list-controls">
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="department">Department</option>
            <option value="salary">Salary</option>
          </select>
        </div>
      </div>

      {loading && (
        <p className="status-message">
          Loading employees...
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Join Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.role}</td>
                  <td>₹{employee.salary}</td>

                  <td>
                    {new Date(
                      employee.joinDate
                    ).toLocaleDateString("en-IN")}
                  </td>

                  <td className="action-buttons">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(employee._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEmployees.length === 0 && (
            <p className="no-data">
              No employees found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;