import { CreateEmployee } from "./containers/CreateEmployee/CreateEmployee";
import { ListEmployee } from "./containers/ListEmployee/ListEmployee";

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
