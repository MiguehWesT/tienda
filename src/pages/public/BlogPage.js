import React from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/atoms/Button';

const BlogPage = () => {
  const { blogPosts } = useApp();

  return (
    <div className="page">
      <div className="container">
        <h1>Blog</h1>
        <div className="blog-grid">
          {blogPosts.map(post => (
            <div key={post.id} className="blog-card">
              <div className="blog-image">{post.image}</div>
              <div className="blog-content">
                <h3>{post.title}</h3>
                <p className="blog-date">{post.date}</p>
                <p>{post.excerpt}</p>
                <Button variant="secondary">Leer más</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;