import React from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import Profile from '../../components/Profile';
import Github from '../../components/Github';
import Calendar from '../../components/Calendar';

const { Content } = Layout;

export default function ContentComp() {
  return (
    <Content style={{ margin: "0 16px" }}>
      <Switch>
          <Route exact path="/" component={Profile} />
          <Route path="/profile" component={Profile} />
          <Route path="/github" component={Github} />
          <Route path="/calendar" component={Calendar} />
        </Switch>
    </Content>
  );
}
