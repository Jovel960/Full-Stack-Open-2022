import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  console.log("blog", blog)
  return (
    <div style={{ flexDirection: "column", cursor:"default" }}>
      {blog.title}
      <Togglable buttonLabel="View">
        <p>{"URL: " + blog.url}</p>
        <p>{"Likes: " + blog.likes}</p>
        <p>{"Author: " + blog.author}</p>
        <p>{"Owner: " + blog.user.name}</p>
      </Togglable>
    </div>
  );
};

export default Blog;
