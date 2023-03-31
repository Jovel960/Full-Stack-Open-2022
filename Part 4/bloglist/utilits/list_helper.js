var _ = require('lodash');
function dummy(blogs) {
  return 1;
}

function totalLikes(blogsArr) {
  let sum = _.reduce(blogsArr, (a, b) => a + b.likes, 0);
  return sum;
}

function blogWithMaxLikes(blogsArr) {
  let firstBlog = _.maxBy(blogsArr, (x) => x.likes)
  return firstBlog;
}

function mostBlogs(blogs) {
  const grouped = _.groupBy(blogs, 'author');
  const authorCounts = _.mapValues(grouped, group => group.length);
  const maxAuthor = _.maxBy(_.keys(authorCounts), author => authorCounts[author]);

  return {
    author: maxAuthor,
    blogs: authorCounts[maxAuthor],
  };
}

module.exports = { dummy, totalLikes, blogWithMaxLikes, mostBlogs };
