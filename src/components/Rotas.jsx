import { Route, Switch } from 'react-router'

import { Home } from '../pages/Home'

export function Rotas(){
  return(
    <Switch>
      <Route path="/" exact component={ Home }/>
    </Switch>
  );
}