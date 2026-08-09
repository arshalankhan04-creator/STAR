import { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductFormModal from '../../components/Admin/ProductFormModal';

// Salted SHA-256 cryptographic hash of PIN (prevents lookup tables & rainbow attacks)
const ADMIN_PIN_HASH = '3616533c8ecd3a59c88de5473dcbad761f83a1bb829c9a4f67567987d1d5a682';
const PIN_SALT = 'STAR_HERBAL_SALT_987654_';

async function hashPin(pin) {
  const msgUint8 = new TextEncoder().encode(PIN_SALT + pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('star_admin_authed') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const inputHash = await hashPin(pinInput.trim());
    if (inputHash === ADMIN_PIN_HASH) {
      sessionStorage.setItem('star_admin_authed', 'true');
      setIsAuthenticated(true);
      setPinError(false);
      showToast('Welcome back, Admin!');
    } else {
      setPinError(true);
      setPinInput('');
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('star_admin_authed');
    setIsAuthenticated(false);
    setPinInput('');
  }

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  }

  function handleOpenAddModal() {
    setEditingProduct(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(product) {
    setEditingProduct(product);
    setIsModalOpen(true);
  }

  function handleSaveProduct(formData) {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      showToast(`Updated "${formData.name}" successfully!`);
    } else {
      addProduct(formData);
      showToast(`Added "${formData.name}" to catalog!`);
    }
    setIsModalOpen(false);
  }

  function handleDelete(product) {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      deleteProduct(product.id);
      showToast(`Deleted "${product.name}".`);
    }
  }

  function handleResetCatalog() {
    if (
      window.confirm(
        'Are you sure you want to reset all products back to default catalog data? Any custom additions will be lost.'
      )
    ) {
      resetProducts();
      showToast('Catalog reset to default state.');
    }
  }

  const filteredProducts = products.filter((p) => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch =
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameGu?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredCount = products.filter((p) => p.featured).length;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-4 pt-20">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-sm w-full border border-[#E4E4DC] text-center animate-fade-in">
          <div className="w-12 h-12 bg-[#6B8F5E]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#6B8F5E]">
            <LockIcon />
          </div>
          <h1 className="font-['Montserrat'] text-lg uppercase tracking-[0.15em] text-[#2C2C2C] font-light mb-1">
            Admin Access
          </h1>
          <p className="text-xs text-[#7A7A72] mb-6">Enter Admin PIN to manage STAR Herbal products</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError(false);
              }}
              placeholder="Enter PIN"
              maxLength={6}
              className={`w-full text-center tracking-[0.3em] font-mono text-lg py-2.5 px-4 border rounded-lg focus:outline-none transition-colors ${
                pinError
                  ? 'border-red-500 bg-red-50 text-red-600 focus:border-red-500'
                  : 'border-[#C8C8C0] focus:border-[#6B8F5E]'
              }`}
              autoFocus
            />
            {pinError && <p className="text-red-500 text-[11px]">Incorrect PIN. Please try again.</p>}
            <button
              type="submit"
              className="w-full py-3 bg-[#6B8F5E] hover:bg-[#5a7b4f] text-white text-xs uppercase tracking-[0.15em] font-['Montserrat'] rounded-lg transition-colors cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F4] pt-20 pb-20">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#2C2C2C] text-white px-5 py-3 rounded-lg shadow-lg text-xs font-['Montserrat'] tracking-wide flex items-center gap-2 animate-slide-in-right">
          <span className="text-[#6B8F5E]">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Banner */}
      <div className="bg-[#2C2C2C] text-white py-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-['Montserrat'] text-xl sm:text-2xl tracking-[0.15em] uppercase text-white font-semibold">
                Product Admin
              </h1>
              <span className="text-[10px] tracking-[0.1em] uppercase bg-[#6B8F5E] text-white px-2 py-0.5 rounded font-['Montserrat']">
                Live Editor
              </span>
            </div>
            <p className="text-xs text-white/80 font-light mt-1">
              Add, edit, or remove products in real-time across your catalog
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetCatalog}
              className="text-xs px-3 py-2 border border-white/20 hover:border-white/50 text-white/70 hover:text-white rounded transition-colors cursor-pointer font-['Montserrat'] uppercase tracking-wider"
              title="Reset catalog to initial default data"
            >
              Reset Catalog
            </button>
            <button
              onClick={handleLogout}
              className="text-xs px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors cursor-pointer font-['Montserrat'] uppercase tracking-wider"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-lg border border-[#E4E4DC] shadow-xs">
            <span className="text-[10px] font-['Montserrat'] uppercase tracking-[0.15em] text-[#7A7A72]">
              Total Products
            </span>
            <p className="font-['Montserrat'] text-3xl text-[#2C2C2C] font-light mt-1">
              {products.length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-[#E4E4DC] shadow-xs">
            <span className="text-[10px] font-['Montserrat'] uppercase tracking-[0.15em] text-[#7A7A72]">
              Featured Products
            </span>
            <p className="font-['Montserrat'] text-3xl text-[#6B8F5E] font-light mt-1">
              {featuredCount}
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-[#E4E4DC] shadow-xs">
            <span className="text-[10px] font-['Montserrat'] uppercase tracking-[0.15em] text-[#7A7A72]">
              Categories
            </span>
            <p className="font-['Montserrat'] text-3xl text-[#2C2C2C] font-light mt-1">
              5
            </p>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="bg-white p-4 rounded-lg border border-[#E4E4DC] shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name or category..."
              className="w-full px-3 py-2 border border-[#C8C8C0] rounded text-xs focus:outline-none focus:border-[#6B8F5E]"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-[#C8C8C0] rounded text-xs focus:outline-none focus:border-[#6B8F5E] bg-white"
            >
              <option value="all">All Categories</option>
              <option value="soap">Soap</option>
              <option value="hair-oil">Hair Oil</option>
              <option value="shampoo">Shampoo</option>
              <option value="face-gel">Face Gel</option>
              <option value="face-wash">Face Wash</option>
            </select>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#6B8F5E] hover:bg-[#5a7b4f] text-white text-xs uppercase tracking-[0.15em] font-['Montserrat'] rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>+</span> Add New Product
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-[#E4E4DC] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F0F4EE] border-b border-[#E4E4DC] text-[10px] font-['Montserrat'] uppercase tracking-[0.15em] text-[#7A7A72]">
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Pricing</th>
                  <th className="py-3 px-4 text-center">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E4DC] text-xs">
                {filteredProducts.map((p) => {
                  const displayPriceStr = p.hasVariants
                    ? p.variants && p.variants.length > 0
                      ? `₹${Math.min(...p.variants.map((v) => v.price))} – ₹${Math.max(...p.variants.map((v) => v.price))}`
                      : 'Variants'
                    : `₹${p.price} ${p.unit ? `/ ${p.unit}` : ''}`;

                  return (
                    <tr key={p.id} className="hover:bg-[#FAFBF9] transition-colors">
                      {/* Product image & names */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#F5F5F0] border border-[#E4E4DC] rounded overflow-hidden flex-shrink-0">
                            {p.image ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                className={`w-full h-full object-${p.imageStyle || 'contain'}`}
                              />
                            ) : (
                              <span className="text-[9px] text-[#AEAEA6] flex items-center justify-center h-full">
                                No pic
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-['Montserrat'] text-xs text-[#2C2C2C] font-medium">
                              {p.name}
                            </p>
                            {p.nameGu && (
                              <p className="text-[11px] text-[#7A7A72] font-normal">{p.nameGu}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="inline-block text-[10px] font-['Montserrat'] uppercase tracking-wider px-2 py-0.5 bg-[#F5F5F0] text-[#6B8F5E] rounded border border-[#E4E4DC]">
                          {p.categoryLabel || p.category}
                        </span>
                      </td>

                      {/* Pricing */}
                      <td className="py-3 px-4 font-['Montserrat'] text-xs text-[#2C2C2C]">
                        {displayPriceStr}
                        {p.hasVariants && p.variants && (
                          <span className="text-[10px] text-[#7A7A72] block">
                            ({p.variants.length} sizes)
                          </span>
                        )}
                      </td>

                      {/* Featured */}
                      <td className="py-3 px-4 text-center">
                        {p.featured ? (
                          <span className="text-amber-500 text-sm" title="Featured product">★</span>
                        ) : (
                          <span className="text-gray-300 text-sm">☆</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="px-3 py-1 bg-gray-100 hover:bg-[#6B8F5E] text-[#2C2C2C] hover:text-white rounded text-[11px] font-['Montserrat'] uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="px-3 py-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded text-[11px] font-['Montserrat'] uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#7A7A72] text-xs">
                      No products found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Form Component */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={editingProduct}
      />
    </main>
  );
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
