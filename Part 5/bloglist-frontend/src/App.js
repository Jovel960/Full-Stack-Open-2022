import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { CreateNewBlog } from "./components/CreateNewBlog";
import blogService from "./services/blogs";
import { Message } from "./components/Message";
import { LoginForm } from "./components/LoginForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState();

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

  if (!user) {
    return (
      <LoginForm
        user={user}
        setUser={setUser}
        setType={setType}
        setMessage={setMessage}
      />
    );
  }

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <header style={{ textAlign: "center" }}>
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
      {message && <Message message={message} type={type} />}
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
      <Togglable>
        <CreateNewBlog
          setType={setType}
          setMessage={setMessage}
          setBlogs={setBlogs}
          blogs={blogs}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
