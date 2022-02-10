import { Route, Switch } from 'react-router'

import { Home } from '../pages/Home'
import {Register} from '../pages/Register'

export function Rotas(){
  return(
    <Switch>
      <Route path="/" exact component={ Home }/>


      <Route path="/register" exact component={ Register}/>
    </Switch>
  );
}