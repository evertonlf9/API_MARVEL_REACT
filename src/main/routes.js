import React  from 'react';
import { Switch, Route } from 'react-router';

import Comics from '../components/comics';
import Characters from '../components/characters';
import Details from '../components/details';

export default props =>
       <Switch>
           <Route exact path="/" component={Comics}/>
           <Route exact path="/characters" component={Characters}/>
           <Route path="/comics/:id" component={Details}/>
           <Route path="/characters/:id" component={Details}/>
           <Route from="*" to="/"/>
       </Switch>