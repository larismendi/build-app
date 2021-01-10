import React, { useContext, useState } from "react";
import { Layout } from "antd";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Signup from "../Signup";
import { withRouter } from "react-router";
import firebase from "firebase/app";
import "firebase/auth";
import app from "../../firebaseConfig";
import { AuthGlobal } from "../../contexts/stores/Auth";
import {
  setCurrentUser,
  logoutUser,
} from "../../contexts/actions/authentication.action";
import Error from "../../components/Error";

import jwt_decode from "jwt-decode";
import axios from "axios";

const Login = ({ history }) => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  const githubAuthProvider = new firebase.auth.GithubAuthProvider();

  const { Content } = Layout;
  const [signup, setSignup] = useState(false);
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginUser = (user) => {
    const { email, password } = user;
    axios
      .post(
        "http://localhost:8001/login",
        {},
        {
          auth: {
            username: email,
            password: password,
          },
        }
      )
      .then((response) => {
        if (response.data.access_token) {
          jwtToken(response.data.access_token);
        } else {
          setError(response.data.detail);
          logoutUser(context.dispatch);
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setError(error.response.data.error);
        } else if (error.response.status === 401) {
          setError(error.response.data.detail);
        } else {
          setError(error.response.data.error);
        }
        logoutUser(context.dispatch);
      });
  };

  const jwtToken = (token) => {
    localStorage.setItem("jwt", token);
    const decoded = jwt_decode(token);
    setError(null);
    context.dispatch(setCurrentUser(decoded));
  };

  const socialLogin = async (provider) => {
    await app
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
        console.log(response);
        tokenGithub(response);
        history.push("/");
      })
      .catch((error) => {
        logoutUser(context.dispatch);
        setError(error.message);
      });
  };

  const tokenGithub = (response) => {
    if (response.credential.accessToken) {
      localStorage.setItem("github", JSON.stringify({
        'token': response.credential.accessToken,
        'email': response.user.email,
        'displayName': response.user.displayName
      }));
      setError(null);
      context.dispatch(setCurrentUser(response.user));
    } else {
      logoutUser(context.dispatch);
      setError('Ocurrio un error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };

    if (email === "" || password === "") {
      setError("Ingrese datos correctamente");
    } else {
      loginUser(user);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content
        style={{
          padding: "0 50px",
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: 24,
            height: 450,
            width: 400,
            textAlign: "center",
            flexDirection: "column",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {!signup ? (
            <Form className="login-form" onSubmit={handleSubmit}>
              <Form.Item>
                <img alt="Build App Logo Blanco" src="/logo_w.webp" style={{height: "70px"}} />
              </Form.Item>
              <Form.Item>
                <h1>Login</h1>
              </Form.Item>
              {error ? (
                <Form.Item>
                  <Error mensaje={error} />
                </Form.Item>
              ) : null}
              <Form.Item>
                <Input
                  prefix={
                    <UserOutlined
                      style={{
                        color: "rgba(0,0,0,.25)",
                      }}
                    />
                  }
                  id="email"
                  name="email"
                  placeholder="Correo"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <LockOutlined
                      style={{
                        color: "rgba(0,0,0,.25)",
                      }}
                    />
                  }
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Clave"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="button"
                  className="login-form-button"
                  style={{ marginRight: 10 }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Ingresa
                </Button>
                O{" "}
                <Button onClick={() => setSignup(true)} type="link">
                  Registrate Ahora!
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="danger"
                  htmlType="button"
                  className="login-form-button"
                  style={{ marginRight: 10 }}
                  onClick={() => socialLogin(googleAuthProvider)}
                >
                  Google
                </Button>
                <Button
                  type="danger"
                  htmlType="button"
                  className="login-form-button"
                  style={{ marginRight: 10 }}
                  onClick={() => socialLogin(githubAuthProvider)}
                >
                  GitHub
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Signup setSignup={setSignup} />
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default withRouter(Login);
