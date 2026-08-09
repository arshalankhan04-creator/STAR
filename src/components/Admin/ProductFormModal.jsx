import { useState, useEffect } from 'react';

const CATEGORY_OPTIONS = [
  { value: 'soap', label: 'Handmade Soap (soap)', labelGu: 'હાથથી બનાવેલ સાબુ' },
  { value: 'hair-oil', label: 'Hair Oil (hair-oil)', labelGu: 'હેર ઓઈલ' },
  { value: 'shampoo', label: 'Shampoo (shampoo)', labelGu: 'શૅમ્પૂ' },
  { value: 'face-gel', label: 'Face Gel (face-gel)', labelGu: 'ફેસ જેલ' },
  { value: 'face-wash', label: 'Face Wash (face-wash)', labelGu: 'ફેસ વોશ' },
];

export default function ProductFormModal({ isOpen, onClose, onSave, productToEdit }) {
  const [name, setName] = useState('');
  const [nameGu, setNameGu] = useState('');
  const [category, setCategory] = useState('soap');
  const [featured, setFeatured] = useState(false);
  const [imageStyle, setImageStyle] = useState('contain');
  const [image, setImage] = useState('');

  const [hasVariants, setHasVariants] = useState(false);
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [variants, setVariants] = useState([]);

  const [benefitsEn, setBenefitsEn] = useState('');
  const [benefitsGu, setBenefitsGu] = useState('');
  const [ingredientsEn, setIngredientsEn] = useState('');
  const [ingredientsGu, setIngredientsGu] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || '');
      setNameGu(productToEdit.nameGu || '');
      setCategory(productToEdit.category || 'soap');
      setFeatured(!!productToEdit.featured);
      setImageStyle(productToEdit.imageStyle || 'contain');
      setImage(productToEdit.image || '');

      const isVar = !!productToEdit.hasVariants;
      setHasVariants(isVar);
      if (isVar) {
        setVariants(productToEdit.variants ? [...productToEdit.variants] : []);
        setPrice('');
        setUnit('');
      } else {
        setPrice(productToEdit.price !== null && productToEdit.price !== undefined ? productToEdit.price : '');
        setUnit(productToEdit.unit || '');
        setVariants([]);
      }

      setBenefitsEn(productToEdit.benefitsEn || '');
      setBenefitsGu(productToEdit.benefitsGu || '');
      setIngredientsEn(productToEdit.ingredientsEn || '');
      setIngredientsGu(productToEdit.ingredientsGu || '');
    } else {
      // Default blank state for new product
      setName('');
      setNameGu('');
      setCategory('soap');
      setFeatured(false);
      setImageStyle('contain');
      setImage('');
      setHasVariants(false);
      setPrice('');
      setUnit('50g');
      setVariants([
        { id: `var-1`, label: '50g', price: 30, image: '' },
        { id: `var-2`, label: '100g', price: 60, image: '' },
      ]);
      setBenefitsEn('');
      setBenefitsGu('');
      setIngredientsEn('');
      setIngredientsGu('');
    }
    setError('');
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  function handleImageFileChange(e, setFn) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFn(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleAddVariant() {
    setVariants((prev) => [
      ...prev,
      { id: `var-${Date.now()}`, label: '100g', price: 50, image: '' },
    ]);
  }

  function handleUpdateVariant(index, key, val) {
    setVariants((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: val };
      return copy;
    });
  }

  function handleRemoveVariant(index) {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Product name in English is required.');
      return;
    }

    const categoryObj = CATEGORY_OPTIONS.find((c) => c.value === category);

    const formData = {
      id: productToEdit?.id,
      name: name.trim(),
      nameGu: nameGu.trim() || name.trim(),
      category,
      categoryLabel: categoryObj?.label.split(' (')[0] || 'Handmade Soap',
      categoryLabelGu: categoryObj?.labelGu || 'હાથથી બનાવેલ સાબુ',
      featured,
      imageStyle,
      image,
      hasVariants,
      price: hasVariants ? null : Number(price) || 0,
      unit: hasVariants ? null : unit.trim(),
      variants: hasVariants
        ? variants.map((v, i) => ({
            id: v.id || `var-${i}-${Date.now()}`,
            label: v.label,
            price: Number(v.price) || 0,
            image: v.image || image,
          }))
        : null,
      benefitsEn: benefitsEn.trim(),
      benefitsGu: benefitsGu.trim(),
      ingredientsEn: ingredientsEn.trim(),
      ingredientsGu: ingredientsGu.trim(),
    };

    onSave(formData);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-[#2C2C2C] text-white px-6 py-4 flex items-center justify-between">
          <h2 className="font-['Montserrat'] text-sm tracking-[0.15em] uppercase font-light">
            {productToEdit ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors cursor-pointer text-xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded">
              {error}
            </div>
          )}

          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-['Montserrat'] uppercase tracking-wider text-[#7A7A72] mb-1">
                Product Name (English) *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Skin Care Soap"
                className="w-full px-3 py-2 border border-[#C8C8C0] rounded text-xs focus:outline-none focus:border-[#6B8F5E]"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-['Montserrat'] uppercase tracking-wider text-[#7A7A72] mb-1">
                Product Name (Gujarati)
              </label>
              <input
                type="text"
                value={nameGu}
                onChange={(e) => setNameGu(e.target.value)}
                placeholder="e.g. સ્કિન કેર સાબુ"
                className="w-full px-3 py-2 border border-[#C8C8C0] rounded text-xs focus:outline-none focus:border-[#6B8F5E]"
              />
            </div>
          </div>

          {/* Category & Featured & Image Fit */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-['Montserrat'] uppercase tracking-wider text-[#7A7A72] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-[#C8C8C0] rounded text-xs focus:outline-none focus:border-[#6B8F5E] bg-white"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-['Montserrat'] uppercase tracking-wider text-[#7A7A72] mb-1">
                Image Style
              </label>
              <select
                value={imageStyle}
                onChange={(e) => setImageStyle(e.target.value)}
                className="w-full px-3 py-2 border border-[#C8C8C0] rounded text-xs focus:outline-none focus:border-[#6B8F5E] bg-white"
              >
                <option value="contain">Contain (Full Image)</option>
                <option value="cover">Cover (Crop to Fit)</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#2C2C2C]">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded border-[#C8C8C0] text-[#6B8F5E] focus:ring-[#6B8F5E]"
                />
                <span className="font-['Montserrat'] uppercase tracking-wider text-[11px]">
                  Featured Product
                </span>
              </label>
            </div>
          </div>

          {/* Main Product Image Picker */}
          <div className="border border-[#E4E4DC] p-4 rounded-lg bg-[#FAFAFA]">
            <label className="block text-[11px] font-['Montserrat'] uppercase tracking-wider text-[#7A7A72] mb-2">
              Main Product Photo
            </label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white border border-[#C8C8C0] rounded overflow-hidden flex items-center justify-center flex-shrink-0">
                {image ? (
                  <img src={image} alt="Preview" className={`w-full h-full object-${imageStyle}`} />
                ) : (
                  <span className="text-[10px] text-[#AEAEA6]">No image</span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFileChange(e, setImage)}
                  className="text-xs text-[#7A7A72]"
                />
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Or paste Image URL..."
                  className="w-full px-3 py-1.5 border border-[#C8C8C0] rounded text-xs focus:outline-none focus:border-[#6B8F5E]"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Variants Toggle */}
          <div className="border-t border-[#E4E4DC] pt-4">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs font-['Montserrat'] uppercase tracking-wider text-[#2C2C2C] font-medium">
                Pricing Structure
              </label>
              <div className="flex items-center gap-3 text-xs">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="pricingType"
                    checked={!hasVariants}
                    onChange={() => setHasVariants(false)}
                  />
                  <span>Single Price</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="pricingType"
                    checked={hasVariants}
                    onChange={() => setHasVariants(true)}
                  />
                  <span>Multiple Variants</span>
                </label>
              </div>
            </div>

            {!hasVariants ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-['Montserrat'] uppercase tracking-wider text-[#7A7A72] mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 70"
                    className="w-full px-3 py-2 border border-[#C8C8C0] rounded text-xs focus:outline-none focus:border-[#6B8F5E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-['Montserrat'] uppercase tracking-wider text-[#7A7A72] mb-1">
                    Unit / Size
                  </label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="e.g. 50g or 100ml"
                    className="w-full px-3 py-2 border border-[#C8C8C0] rounded text-xs focus:outline-none focus:border-[#6B8F5E]"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-['Montserrat'] uppercase tracking-wider text-[#7A7A72]">
                    Variants List
                  </span>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="text-xs text-[#6B8F5E] hover:underline font-['Montserrat'] uppercase tracking-wider cursor-pointer"
                  >
                    + Add Variant
                  </button>
                </div>
                {variants.map((variant, index) => (
                  <div key={variant.id || index} className="flex items-center gap-2 bg-[#F9F9F7] p-2 rounded border border-[#E4E4DC]">
                    <input
                      type="text"
                      value={variant.label}
                      onChange={(e) => handleUpdateVariant(index, 'label', e.target.value)}
                      placeholder="Label (e.g. 50g)"
                      className="w-24 px-2 py-1 border border-[#C8C8C0] rounded text-xs"
                    />
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => handleUpdateVariant(index, 'price', e.target.value)}
                      placeholder="Price (₹)"
                      className="w-24 px-2 py-1 border border-[#C8C8C0] rounded text-xs"
                    />
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange(e, (val) => handleUpdateVariant(index, 'image', val))}
                        className="text-[10px] text-[#7A7A72] max-w-[140px]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="text-red-500 hover:text-red-700 px-2 py-1 text-xs cursor-pointer"
                      title="Delete Variant"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Benefits & Ingredients */}
          <div className="border-t border-[#E4E4DC] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-['Montserrat'] uppercase tracking-wider text-[#7A7A72] mb-1">
                Benefits (English)
              </label>
              <textarea
                value={benefitsEn}
                onChange={(e) => setBenefitsEn(e.target.value)}
                rows={2}
                placeholder="Product benefits in English..."
                className="w-full px-3 py-2 border border-[#C8C8C0] rounded text-xs focus:outline-none focus:border-[#6B8F5E]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-['Montserrat'] uppercase tracking-wider text-[#7A7A72] mb-1">
                Benefits (Gujarati)
              </label>
              <textarea
                value={benefitsGu}
                onChange={(e) => setBenefitsGu(e.target.value)}
                rows={2}
                placeholder="પ્રોડક્ટ ના ફાયદા..."
                className="w-full px-3 py-2 border border-[#C8C8C0] rounded text-xs focus:outline-none focus:border-[#6B8F5E]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-['Montserrat'] uppercase tracking-wider text-[#7A7A72] mb-1">
                Ingredients (English)
              </label>
              <textarea
                value={ingredientsEn}
                onChange={(e) => setIngredientsEn(e.target.value)}
                rows={2}
                placeholder="Key ingredients in English..."
                className="w-full px-3 py-2 border border-[#C8C8C0] rounded text-xs focus:outline-none focus:border-[#6B8F5E]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-['Montserrat'] uppercase tracking-wider text-[#7A7A72] mb-1">
                Ingredients (Gujarati)
              </label>
              <textarea
                value={ingredientsGu}
                onChange={(e) => setIngredientsGu(e.target.value)}
                rows={2}
                placeholder="સામગ્રી..."
                className="w-full px-3 py-2 border border-[#C8C8C0] rounded text-xs focus:outline-none focus:border-[#6B8F5E]"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="border-t border-[#E4E4DC] pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#C8C8C0] text-[#7A7A72] text-xs font-['Montserrat'] uppercase tracking-wider rounded hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#6B8F5E] text-white text-xs font-['Montserrat'] uppercase tracking-wider rounded hover:bg-[#5a7b4f] transition-colors cursor-pointer"
            >
              {productToEdit ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
