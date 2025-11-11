import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CategoryList from '../../components/organisms/CategoryList';
import ProductGrid from '../../components/organisms/ProductGrid';

const CategoriesPage = () => {
  const { categories, products, setCurrentPage, setSelectedProduct } = useApp();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="page">
      <div className="container">
        <h1>Categorías</h1>
        <div className="categories-layout">
          <aside className="sidebar">
            <CategoryList 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryClick={setSelectedCategory}
            />
          </aside>
          <main>
            <h2>{selectedCategory ? categories.find(c => c.name === selectedCategory)?.label : 'Todos los productos'}</h2>
            <ProductGrid 
              products={filteredProducts}
              onProductClick={(product) => {
                setSelectedProduct(product);
                setCurrentPage('product-detail');
              }}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;