/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

const Auth = () => {
  return (
    <div className="flex flex-wrap w-full h-max justify-center items-center gap-20">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [, setCookies] = useCookies(["access_token"]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
      console.log(response);
    } catch (error) {
      console.error(error);
      alert(error);
    }

  }
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", {
        username,
        password,
      });
      alert("Registration completed!! :)");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="mt-20 border shadow-xl p-7 rounded-3xl">
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center items-center"
      >
        <h2 className="text-2xl font-extrabold mb-4">{label}</h2>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="border border-black"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="border border-black"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className="w-full bg-orange-500 text-white px-16 py-2 mt-4 rounded-lg"
            type="submit"
          >
            {label}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
