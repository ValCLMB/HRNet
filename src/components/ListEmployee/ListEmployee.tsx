import { useState } from "react";
import { employeeFieldsTable } from "../employeeFields";
import { Table } from "valclmb-react-table";
import "./ListEmployee.css";

type Employee = {
  firstName: string;
  lastName: string;
  startDate: string;
  department: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

const useLocalData = (key: string) => {
  const localData = localStorage.getItem(key);

  const [employees] = useState<Employee[]>(() =>
    localData ? JSON.parse(localData) : []
  );

  return employees;
};

export const ListEmployee = () => {
  const employees = useLocalData("employees");

  return (
    <section className="listEmployee">
      <h2>Current employees</h2>
      <Table
        columns={employeeFieldsTable}
        datas={employees}
        range={[5, 10, 15, 20]}
      />
      <a href="/">Home</a>
    </section>
  );
};
