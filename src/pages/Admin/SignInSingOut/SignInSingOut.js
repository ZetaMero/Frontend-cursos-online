import React, { useState } from "react";
import "./SignInSingOut.scss";
import { isEmailValid } from "../../../utils/validation";
import wave from "../../../assets/img/png/wave.png";
import bg from "../../../assets/img/svg/bg.svg";
import LogoFacci from "../../../assets/img/png/logoFaci.png";
import SignInForm from "../../../components/Admin/SignInForm/SignInForm";
import BasicModal from "../../../components/Admin/BasicModal";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
// import { useQuery } from "react-apollo";
import { LOGIN_QUERY } from "../../../graphql/admin/operation/query/users";
import { useLazyQuery } from "@apollo/client";
import { ACCESS_TOKEN } from "../../../utils/constants";
import { getAccessToken, logout } from "../../../api/auth";
import { values, size } from "lodash";
export default function SignInSingOut() {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [formData, setFormData] = useState(initialFormValue());
  const { email, password } = formData;
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [logina] = useLazyQuery(LOGIN_QUERY, {
    onCompleted(data) {
      const { message, status, token } = data.login;
      const tr = validarToken(token);
      if (tr === true) {
        toast.error("😲 no eres administrador");
        setSignUpLoading(false);
      } else if (!status) {
        toast.error("😲 " + message);
      } else {
        localStorage.setItem(ACCESS_TOKEN, token);

        toast.success("😲" + message);

        window.location.href = "/admin";
      }
    },
  });
  if (getAccessToken()) {
    return <Redirect to="/admin" />;
  }
  function validarToken(token) {
    if (!token || token === "null") {
      setSignUpLoading(false);
      return null;
    }

    const meta = jwtDecode(token);
    const { user } = meta;
    if (user.role === "DOCENTE" || user.role === "ESTUDIANTE") {
      logout();
      return true;
    }
    return false;
  }

  const login = (e) => {
    e.preventDefault();
    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    if (validCount !== size(formData)) {
      toast.warning("😲 Completa todo los campos del formulario ");
    } else {
      if (!isEmailValid(email)) {
        toast.warning("😲 Email invalido");
      } else if (size(password) < 6) {
        toast.warning("la contrasenas deben tener al menos 6 caracteres");
      } else {
        setSignUpLoading(true);
        logina({ variables: { email: email, password: password } });
      }
    }
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };
  return (
    <>
      <img className="wave" src={wave} alt="wave"></img>
      <div className="container">
        <div className="img">
          <img src={bg} alt="bg" />
        </div>
        <div className="login-content">
          <BasicModal show={showModal} setShow={setShowModal}>
            {contentModal}
          </BasicModal>
          <form onSubmit={login} onChange={onChange}>
            <img src={LogoFacci} className="facci" alt="logoFacci" />

            {/* <h2 className="title">Login</h2> */}
            <div className="input-div one">
              <div className="i">
                <UserOutlined style={{ color: "#38d39f" }} />
              </div>
              <div className="div">
                <input
                  type="text"
                  placeholder="Email"
                  className="input"
                  name="email"
                  defaultValue={email}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <UnlockOutlined style={{ color: "#38d39f" }} />
              </div>
              <div className="div">
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  name="password"
                  defaultValue={password}
                />
              </div>
            </div>
            <Link
              to=""
              onClick={() =>
                openModal(<SignInForm setShowModal={setShowModal} />)
              }
            >
              Forgot Password?
            </Link>

            <Button className="btn" type="submit">
              {!signUpLoading ? (
                "Iniciar sesion"
              ) : (
                <Spinner animation="border" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

function initialFormValue() {
  return {
    email: "",
    password: "",
  };
}
