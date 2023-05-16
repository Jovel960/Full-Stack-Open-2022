import Blog from "../components/Blog";
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'


test("check that the blog have title and author", async () => {
    const setBlogs = jest.fn();
    const setLiked = jest.fn();
    const blog = {title:"Life without smart phone",author:"Jovel",url:"Yovel.com",likes:12,user:{name:"yovel",id:"6452baeb5c9c8a2958f98487"}}
    const blogs=[];
    
    const {component} = render(<Blog setBlogs={setBlogs} setLiked={setLiked} blog={blog} blogs={blogs} />);

    
    screen.debug();
})