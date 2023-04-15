import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
export const LoginForm = ({ setUser, user, setType, setMessage }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let user = await loginService({ username, password });
      setUser(user.data);
      blogService.setToken(user.data.token);
      window.localStorage.setItem("userData", JSON.stringify(user.data));
      setMessage("Logged in succesfully");
      setTimeout(() => setMessage(""), 5000);
      setType(true);
      setUserName("");
      setPassword("");
    } catch (err) {
      setMessage(err);
      setType(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  if (user) return null;
  return (
    <div
      style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyItems:"center",
        fontFamily: "sans-serif",
        fontSize: "1.5rem",
        color: "green",
        marginLeft: "10px",
      }}
    >
      <h2>Login</h2>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleLogin}
      >
        <label
          style={{ margin: "10px" }}
          placeholder="username"
          form="username"
        >
          <input
            type="text"
            id="username"
            value={username}
            placeholder="User name"
            onChange={({ target }) => setUserName(target.value)}
          />
        </label>
        <label
          style={{ margin: "10px" }}
          placeholder="password"
          form="password"
        >
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <input
          style={{
            maxWidth: "max-content",
            margin: "10px",
            borderRadius: "25px",
            color: "blue",
            backgroundColor: "aliceblue",
            placeSelf:"center"
          }}
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};
