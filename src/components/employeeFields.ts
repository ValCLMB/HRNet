import { USstates, departments } from "./SelectOptions";

export const employeesFields = [
  { label: "First Name", param: "firstName" },
  { label: "Last Name", param: "lastName" },
  { label: "Date of birth", param: "dateOfBirth", type: "date" },
  { label: "Start date", param: "startDate", type: "date" },
  [
    { label: "Street", param: "street", category: "Address" },
    { label: "City", param: "city" },
    { label: "State", param: "state", type: "select", options: USstates },
    { label: "Zip", param: "zip", type: "number" },
  ],
  {
    label: "Department",
    param: "department",
    type: "select",
    options: departments,
  },
];

export const employeeFieldsTable = [
  { label: "First Name", param: "firstName" },
  { label: "Last Name", param: "lastName" },
  { label: "Date of birth", param: "dateOfBirth" },
  { label: "Start date", param: "startDate" },
  { label: "Street", param: "street" },
  { label: "City", param: "city" },
  { label: "State", param: "state" },
  { label: "Zip", param: "zip" },
  {
    label: "Department",
    param: "department",
  },
];
