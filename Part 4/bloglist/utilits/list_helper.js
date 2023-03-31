
function dummy(blogs) {
  return 1;
}

function totalLikes(blogsArr) {
  let sum = blogsArr.reduce((a, b) => a + b.likes, 0);
  return sum;
}

function blogWithMaxLikes(blogsArr) {
  let firstBlog = blogsArr[0];
  for (blog of blogsArr) {
    if (blog.likes > firstBlog.likes) firstBlog = blog;
  }
  return firstBlog;
}

module.exports = { dummy, totalLikes, blogWithMaxLikes };
