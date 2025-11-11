import React from 'react';

const CategoryList = ({ categories, onCategoryClick, selectedCategory }) => {
  return (
    <div className="category-list">
      <button 
        className={`category-item ${!selectedCategory ? 'active' : ''}`}
        onClick={() => onCategoryClick(null)}
      >
        Todas las categorías
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`category-item ${selectedCategory === cat.name ? 'active' : ''}`}
          onClick={() => onCategoryClick(cat.name)}
        >
          {cat.label} ({cat.count})
        </button>
      ))}
    </div>
  );
};

export default CategoryList;