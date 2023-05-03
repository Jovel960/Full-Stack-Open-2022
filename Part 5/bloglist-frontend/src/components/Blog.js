import Togglable from "./Togglable";
import blogServices from "../services/blogs";
const Blog = ({ blog }) => {
  const likeBlog = async () => {
    try {
      await blogServices.likeBlog(blog.id);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteBlog = async () => {
    try {
      await blogServices.deleteBlog(blog.id);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{ flexDirection: "column", cursor: "default" }}>
      <span style={{ display: "flex", alignItems:"center", justifyItems:"center" }}>
        <p>{blog.title}</p>
        <button
          style={{ color: "blue", textAlign: "center", borderRadius: "8px", height:"min-content", marginLeft:"10px" }}
          onClick={deleteBlog}
        >
          Delete
        </button>
      </span>

      <Togglable buttonLabel="View">
        <p>{"URL: " + blog.url}</p>
        <span style={{ display: "flex", alignItems:"center", justifyItems:"center"  }}>
          <p>{"Likes: " + blog.likes}</p>
          <button
            style={{ color: "blue", textAlign: "center", borderRadius: "8px", height:"min-content", marginLeft:"10px", }}
            onClick={likeBlog}
          >
            Like
          </button>
        </span>
        <p>{"Author: " + blog.author}</p>
        <p>{"Owner: " + blog.user.name}</p>
      </Togglable>
    </div>
  );
};

export default Blog;
