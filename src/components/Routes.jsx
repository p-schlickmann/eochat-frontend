import { Route, Switch } from 'react-router'

import { Home } from '../pages/home'
import {Chat} from "../pages/chat";
import PrivateRoute from "./PrivateRoute";

export function Routes(){
  return(
    <Switch>
      <Route path="/" exact component={ Home }/>
      <PrivateRoute path="/chat/:code" component={ Chat }/>
    </Switch>
  );
}