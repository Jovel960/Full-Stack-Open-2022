const { dummy, totalLikes } = require("../utilits/list_helper");

test("First test", () => {
  const blogs = [];
  const dummyReturn = dummy(blogs);

  expect(dummyReturn).toBe(1);
});

describe("total likes test", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];
  test("helper function test", () => {
    expect(totalLikes(listWithOneBlog)).toBe(5);
  });
});
