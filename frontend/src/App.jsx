import { useState } from "react";
import "./css/App.css";

import Header from "./components/Header";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

function App() {
  const [editEmployee, setEditEmployee] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const refreshEmployees = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="app">
      <Header />

      <EmployeeForm
        editEmployee={editEmployee}
        setEditEmployee={setEditEmployee}
        refreshEmployees={refreshEmployees}
      />

      <EmployeeList setEditEmployee={setEditEmployee} refresh={refresh} />
    </div>
  );
}

export default App;
