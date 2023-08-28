import { employeeFieldsTable } from "../../components/employeeFields";
import { Table } from "valclmb-react-table";
import "./ListEmployee.css";
import { useLocalData } from "../../hooks/useLocalData";

export type Employee = {
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
  const { datas } = useLocalData<Employee>("employees");
  console.log(datas);

  return (
    <section className="listEmployee">
      <h2>Current employees</h2>
      <Table columns={employeeFieldsTable} datas={datas} />
      <a href="/">Home</a>
    </section>
  );
};
