import { useState, useEffect, useRef } from "react";
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
  const clickedNew = useRef(null);
  const [like, setLiked] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [like]);

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
      <Togglable ref={clickedNew} buttonLabel="New blog">
        <CreateNewBlog
          ref={clickedNew}
          setType={setType}
          setMessage={setMessage}
          setBlogs={setBlogs}
          blogs={blogs}
        />
      </Togglable>
      {blogs.sort((a,b) => b.likes - a.likes).map((blog) => (
        <div key={blog.id} style={{ flexDirection: "row" , border:"1px solid black", padding:"5px", marginTop:"3px"}}>
            <Blog like={like} setLiked={setLiked} blogs={blogs} setBlogs={setBlogs} blog={blog} />
        </div>
      ))}
    </div>
  );
};

export default App;
