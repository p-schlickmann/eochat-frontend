import { Route, Switch } from 'react-router'

import {Home} from '../pages/home'
import {Chat} from "../pages/chat";
import PrivateRoute from "./PrivateRoute";
import {Register} from '../pages/register';
import {Login} from "../pages/login";
import {CreateChat} from "../pages/create-chat";

export function Routes(){
  return(
    <Switch>
      <PrivateRoute path="/" exact component={ Home }/>
      <PrivateRoute path="/chat/:code" component={ Chat }/>
      <PrivateRoute path="/create-chat" component={ CreateChat }/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
    </Switch>
  );
}