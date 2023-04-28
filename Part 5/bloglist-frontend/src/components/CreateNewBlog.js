import blogsService from "../services/blogs";
import { useState, forwardRef } from "react";

export const CreateNewBlog = forwardRef(({ setMessage, setBlogs, blogs, setType }, ref) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const createNewBlog = async (e) => {
    e.preventDefault();
    ref.current.toggaleVisibillity();
    if (title === "" || url === "") {
        setType(false)
      setMessage("Must include url and title");
      setTimeout(() => setMessage(""), 5000);
    } else {
      try {
        let res = await blogsService.createBlog({ url, author, title });
        setBlogs(blogs.concat(res.data));
        setTitle("");
        setAuthor("");
        setUrl("");
        setType(true);
        setMessage("Blog added !")
        setTimeout(() => setMessage(""), 5000);
      } catch (err) {
        setType(false)
        setMessage(err);
        setTimeout(() => setMessage(""), 5000);
      }
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <h4>New Blog</h4>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={createNewBlog}
      >
        <label placeholder="username" form="title">
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <label placeholder="Author" form="Author">
          <input
            type="text"
            id="Author"
            value={author}
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <label placeholder="Author" form="url">
          <input
            type="text"
            id="url"
            value={url}
            placeholder="Url"
            onChange={({ target }) => setUrl(target.value)}
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
          value="Create"
        />
      </form>
    </div>
  );
});
