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

module.exports = { dummy, totalLikes, blogWithMaxLikes };
