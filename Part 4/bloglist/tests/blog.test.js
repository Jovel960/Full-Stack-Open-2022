const { dummy, totalLikes, blogWithMaxLikes, mostBlogs, mostLikes } = require("../utilits/list_helper");

  let max =  {
      _id: "5a422aa71b54a676234d17f8",
      title: "Oskar",
      author: "Turs",
      url: "",
      likes: 10,
      __v: 0,
    }
  const Blogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 15,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Oskar",
      author: "Turs",
      url: "",
      likes: 10,
      __v: 0,
    },
     {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go ",
      author: "Edsger",
      url: "",
      likes: 1,
      __v: 0,
    },
  ];

test("First test", () => {
  const blogs = [];
  const dummyReturn = dummy(blogs);

  expect(dummyReturn).toBe(1);
});

describe("total likes test", () => {
  test("helper function test", () => {
    expect(totalLikes(Blogs)).toBe(16);
  });
});

test("Return the blog with the max likes", () => {
  expect(max).toEqual(blogWithMaxLikes(Blogs));
})
test("max author blogs", () => {
  expect({ author: 'Edsger W. Dijkstra', blogs: 1 }).toEqual(mostBlogs(Blogs))
})


test("max author likes", () => {
  expect({ author: 'Turs', likes: 10 }).toEqual(mostLikes(Blogs))
})
