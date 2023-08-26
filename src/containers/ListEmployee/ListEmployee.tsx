import { employeeFieldsTable } from "../../components/employeeFields";
import { Table } from "valclmb-react-table";
import "./ListEmployee.css";
import { useLocalData } from "../../hooks/useLocalData";

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

export const ListEmployee = () => {
  const employees = useLocalData<Employee>("employees");

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
