import React from 'react'
import { Link } from 'react-router-dom'

function BlogCard({blog}) {
    return (
        <li className="post1">
                <span>{blog.title}</span>
            <img src={blog.url} alt="" />
        </li>
    )
}

export default BlogCard
