import { withAuthenticator } from "@aws-amplify/ui-react";
import Home from "./components/home/Home";
import "./index.scss";


function App() {
  return (
    <div id="App">
      <Home />
    </div>
  );
}

export default withAuthenticator(App);
