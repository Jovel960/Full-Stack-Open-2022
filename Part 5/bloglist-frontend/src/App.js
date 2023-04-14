import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("userData"));
    if (user) {
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let user = await loginService({ username, password });
      setUser(user.data);
      blogService.setToken(user.data.token);
      window.localStorage.setItem("userData", JSON.stringify(user.data));
      setUserName("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  const loginForm = () => {
    return (
      <form
        style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}
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
          }}
          type="submit"
          value="Login"
        />
      </form>
    );
  };

  if (!user) {
    return (
      <div
        style={{ fontFamily: "sans-serif", fontSize: "1.5rem", color: "green" }}
      >
        <h2>Login</h2>
        {loginForm()}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <header>
        <h2
          style={{
            marginLeft: "10px",
            fontSize: "1.5rem",
            color: "green",
            textTransform: "capitalize",
            cursor: "default",
          }}
        >
          blogs list app
        </h2>
      </header>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "max-content",
          marginBottom: "10px",
        }}
      >
        <span>{`${user.name} is logged in`}</span>
        <button
          onClick={() => {
            window.localStorage.clear();
            setUser(null);
          }}
        >
          Log out
        </button>
      </div>

      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
