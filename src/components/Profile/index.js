import React, { useContext } from "react";
import { withRouter } from "react-router";
import { Breadcrumb } from "antd";
import {AuthGlobal} from "../../contexts/stores/Auth";

const Profile = () => {
  const context = useContext(AuthGlobal);
  let email = '';
  if (context.stateUser.isAuthenticated === true) {
    email = context.stateUser.user.email
  }
  return (
    <>
      <Breadcrumb style={{ margin: "16px" }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>{email}</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        {context.stateUser.isAuthenticated === true ? (
            'Email: ' + email
        ) : null}
      </div>
    </>
  );
}

export default withRouter(Profile);