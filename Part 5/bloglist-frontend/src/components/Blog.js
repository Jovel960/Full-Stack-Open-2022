import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  return (
    <div style={{ flexDirection: "column" }}>
      {blog.title}
      <Togglable buttonLabel="View">
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
        <p>{blog.author}</p>
      </Togglable>
    </div>
  );
};

export default Blog;
