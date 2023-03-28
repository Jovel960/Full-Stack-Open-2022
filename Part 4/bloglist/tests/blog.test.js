const dummy = require('../utilits/list_helper');


test("First test", () => {
    const blogs = [];
    const dummyReturn = dummy(blogs);

    expect(dummyReturn).toBe(1);
})