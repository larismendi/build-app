import React, { useState, useContext } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withRouter } from "react-router";
import { AuthGlobal } from "../../contexts/stores/Auth";
import {
  setCurrentUser,
  logoutUser,
} from "../../contexts/actions/authentication.action";
import Errores from "../../components/Error";

import jwt_decode from "jwt-decode";
import axios from "axios";

const Signup = ({ setSignup, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const context = useContext(AuthGlobal);

  const signupUser = (user) => {
    const { email, password } = user;
    axios
      .post("http://localhost:8001/login/register", {
        username: email,
        password: password,
      })
      .then((response) => {
        if (response.data.access_token) {
          jwtToken(response.data.access_token);
          history.push("/");
        } else {
          setError(response.data.detail);
          logoutUser(context.dispatch);
        }
      })
      .catch((error) => {
        setError(error.response.data.error);
        logoutUser(context.dispatch);
      });
  };

  const jwtToken = (token) => {
    localStorage.setItem("jwt", token);
    const decoded = jwt_decode(token);
    setError(null);
    context.dispatch(setCurrentUser(decoded));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const user = { email, password };

    if (email === "" || password === "") {
      setError("Ingrese datos correctamente");
    } else {
      signupUser(user);
    }
  };

  return (
    <Form className="login-form" onSubmit={handleSignUp}>
      <Form.Item>
        <img alt="Build App Logo Blanco" src="/logo_w.webp" style={{height: "70px"}} />
      </Form.Item>
      <Form.Item>
        <h1>Registro</h1>
      </Form.Item>
      {error ? (
        <Form.Item>
          <Errores mensaje={error} />
        </Form.Item>
      ) : null}
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          id="username"
          name="username"
          placeholder="Registra un Correo"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          name="password"
          type="password"
          placeholder="Registra una Clave"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="button"
          className="login-form-button"
          style={{ marginRight: 10 }}
          onClick={(e) => handleSignUp(e)}
        >
          Registrate
        </Button>
        O{" "}
        <Button onClick={() => setSignup(false)} type="link">
          Ingresa ahora!
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withRouter(Signup);
