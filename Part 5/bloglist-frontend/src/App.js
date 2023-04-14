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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let user = await loginService({ username, password });
      setUser(user.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loginForm = () => {
    return (
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleLogin}
      >
        <label placeholder="username" form="username">
          <input
            type="text"
            id="username"
            value={username}
            placeholder="User name"
            onChange={({ target }) => setUserName(target.value)}
          />
        </label>
        <label placeholder="password" form="password">
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <input
          style={{ maxWidth: "max-content" }}
          type="submit"
          value="Login"
        />
      </form>
    );
  };

  return (
    <div>
      <header>
        <h2
          style={{
            fontFamily: "sans-serif",
            fontSize: "1 rem",
            color: "green",
          }}
        >
          blogs
        </h2>
      </header>
      {user === null ? loginForm() : <span>{`${user.name} is logged in`}</span>}
      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
