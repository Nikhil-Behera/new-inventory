import React, { useState, useEffect } from 'react';
import { mockProducts } from '../data/mockproducts';
import AddProductModal from '../components/AddProductModal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './InventoryPage.css';

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');

  useEffect(() => {
    // This simulates fetching data from an API
    setProducts(mockProducts);
  }, []);

  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData) => {
    if (productToEdit) {
      // Update existing product
      setProducts(products.map(p => p.id === productData.id ? productData : p));
    } else {
      // Add new product
      setProducts(prevProducts => [productData, ...prevProducts]);
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortKey) return 0;
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  return (
    <div className="inventory-page">
      <div className="page-header">
        <div>
          <h1>Inventory</h1>
          <h2>Manage your product inventory</h2>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          + Add Product
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
          <option value="">Sort By</option>
          <option value="productName">Product Name</option>
          <option value="supplier">Supplier</option>
          <option value="quantity">Quantity</option>
          <option value="expiryDate">Expiry Date</option>
        </select>
      </div>

      {isModalOpen && (
        <AddProductModal 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveProduct}
          productToEdit={productToEdit}
        />
      )}
      
      <table className="app-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Expiry Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.supplier}</td>
              <td>{product.quantity}</td>
              <td>Rs{product.price.toFixed(2)}</td>
              <td>{product.expiryDate}</td>
              <td>{product.location}</td>
              <td className="actions-cell">
                <button className="icon-btn" onClick={() => handleOpenEditModal(product)}>
                  <FaEdit />
                </button>
                <button className="icon-btn delete" onClick={() => handleDeleteProduct(product.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryPage;