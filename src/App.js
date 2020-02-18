import React from 'react';
import SignIn from './Component/Sign in';
import Application from './Component/Application';
import Notifier from './Component/Notifier/index.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

// import useShallowEqualSelector from './Redux/useShallowEqualSelector';

function App() {
  // use Dispatch
  // const dispatch = useDispatch();
  // use Selector
  // const user = useShallowEqualSelector(state => state.users);

  const jwt = localStorage.getItem('feathers-jwt');

  return (
    <>
      <Notifier />
      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/">
            <Application />
          </Route>
        </Switch>
        {jwt ? <Redirect to="/" /> : <Redirect to="/signin" />}
      </Router>
    </>
  );
}

export default App;
