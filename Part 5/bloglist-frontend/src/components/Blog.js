import Togglable from "./Togglable";
import blogServices from "../services/blogs";
import PropTypes from 'prop-types'

const Blog = ({ setLiked, like, blog, setBlogs, blogs }) => {
  const likeBlog = async () => {
    try {
      await blogServices.likeBlog(blog.id);
      setLiked(!like);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteBlog = async () => {
    if (window.confirm("Are you sure you want to delete this blog? ")) {
      try {
        await blogServices.deleteBlog(blog.id);
        setBlogs(() => blogs.filter((blogR) => blogR.id !== blog.id));
      } catch (e) {
        if (e.response?.data?.error) {
          alert(e.response.data.error);
        }
      }
    }
  };
  return (
    <div style={{ flexDirection: "column", cursor: "default" }}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <p>{blog.title}</p>
        <button
          style={{
            color: "blue",
            textAlign: "center",
            borderRadius: "8px",
            height: "min-content",
            marginLeft: "10px",
          }}
          onClick={deleteBlog}
        >
          Delete
        </button>
      </span>

      <Togglable buttonLabel="View">
        <p>{"URL: " + blog.url}</p>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <p>{"Likes: " + blog.likes}</p>
          <button
            style={{
              color: "blue",
              textAlign: "center",
              borderRadius: "8px",
              height: "min-content",
              marginLeft: "10px",
            }}
            onClick={likeBlog}
          >
            Like
          </button>
        </span>
        <p>{"Author: " + blog.author}</p>
        <p>{"Owner: " + blog?.user?.name}</p>
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog : PropTypes.object.isRequired,
  setBlogs : PropTypes.func.isRequired,
  blogs : PropTypes.array.isRequired,
  like : PropTypes.bool.isRequired,
  setLiked : PropTypes.func.isRequired
}

export default Blog;
