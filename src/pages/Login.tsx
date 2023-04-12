import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/formLogin/FormLogin";
import "./style.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logged = sessionStorage.getItem("looged");
    if (logged) {
      navigate("/messages");
    }
  }, []);

  return <LoginForm></LoginForm>;
};

export default Login;
