import { Route, Switch } from "react-router-dom";
import SignUp from "./Login/Signup";
import SignIn from "./Login/Login";

function App() {
  return (
   <>
   <Switch>

   <Route path='/' exact>
    <SignUp/>
   </Route>
   <Route path='/login' exact>
    <SignIn/>
   </Route>
   </Switch>

   </>
  );
}

export default App;
