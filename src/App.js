import React, { component } from 'react';
import { HashRouter, BrowserRouter, Route, Switch  } from "react-router-dom";
import Mainpage_Login from './Mainpage_Login';
import About from './About';
import LoginMenu from './LoginMenu';
import Voluntree from './Voluntree';
import MyPot from './MyPot';
import Shoping from './Shoping';
import Rank from './Rank';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/시작페이지" component={LoginMenu} />
        <Route exact path="/loginCheck_true" component={Mainpage_Login} />
        <Route exact path="/" component={Voluntree} />
        <Route exact path="/나의화분" component={MyPot} />
        <Route exact path="/쇼핑하기" component={Shoping} />
        <Route exact path="/랭킹" component={Rank} />
        <Route exact path="/웹정보" component={About} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;