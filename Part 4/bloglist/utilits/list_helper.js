const User = require("../model/user");
var _ = require("lodash");
function dummy(blogs) {
  return 1;
}

function totalLikes(blogsArr) {
  let sum = _.reduce(blogsArr, (a, b) => a + b.likes, 0);
  return sum;
}

function blogWithMaxLikes(blogsArr) {
  let firstBlog = _.maxBy(blogsArr, (x) => x.likes);
  return firstBlog;
}

function mostBlogs(blogs) {
  const grouped = _.groupBy(blogs, "author");
  const authorCounts = _.mapValues(grouped, (group) => group.length);
  const maxAuthor = _.maxBy(
    _.keys(authorCounts),
    (author) => authorCounts[author]
  );

  return {
    author: maxAuthor,
    blogs: authorCounts[maxAuthor],
  };
}

function mostLikes(blogs) {
  const groupedBlogs = _.groupBy(blogs, "author");

  const authorLikes = _.mapValues(groupedBlogs, (blogs) => {
    return _.sumBy(blogs, "likes");
  });

  const sortedAuthors = _.orderBy(
    _.keys(authorLikes),
    (author) => {
      return authorLikes[author];
    },
    "desc"
  );

  const mostLikedAuthor = sortedAuthors[0];

 
  return {
    author: mostLikedAuthor,
    likes: authorLikes[mostLikedAuthor],
  };
}

 const getUsersDb = async () => {
    const users = await User.find({});
    return users.map(user => user);
  }


module.exports = { dummy, totalLikes, blogWithMaxLikes, mostBlogs, mostLikes, getUsersDb };
