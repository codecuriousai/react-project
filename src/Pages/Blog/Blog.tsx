import React from 'react';
import './Blog.css';

const Blog = () => {
  return (
    <div className="blog-container">
      <h1 className="blog-heading">Welcome to Our Blog</h1>

      <div className="blog-card">
        <h2>Why React is Awesome</h2>
        <p>
          React is a powerful JavaScript library for building dynamic user interfaces. Its component-based architecture makes development fast and scalable.
        </p>
      </div>

      <div className="blog-card">
        <h2>Tips for Writing Clean Code</h2>
        <p>
          Clean code is easy to read and maintain. Follow naming conventions, write modular functions, and always comment tricky logic.
        </p>
      </div>
    </div>
  );
};

export default Blog;
