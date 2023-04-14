import blogs from "../services/blogs";
import { useState } from "react";

export const CreateNewBlog = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const createNewBlog = async (e) => {};

  return (
    <div style={{ margin: "10px" }}>
      <h4>New Blog</h4>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={createNewBlog}
      >
        <label  placeholder="username" form="title">
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <label  placeholder="Author" form="Author">
          <input
            type="text"
            id="Author"
            value={author}
            placeholder="Password"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <label  placeholder="Author" form="url">
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
};
