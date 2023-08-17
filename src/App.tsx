import { CreateEmployee } from "./components/CreateEmployee/CreateEmployee";
import { ListEmployee } from "./components/ListEmployee/ListEmployee";

function App() {
  const location = window.location.pathname;

  return (
    <div className="App">
      {location === "/" ? <CreateEmployee /> : null}
      {location === "/list" ? <ListEmployee /> : null}
    </div>
  );
}

export default App;
