/**
 * STAR Herbal Product Catalog
 *
 * Data structure is intentionally designed to support future additions:
 * - description, ingredients, usage, benefits fields are included but optional
 * - variants array supports any combination of size/weight/price
 * - featured flag controls home page display
 * - category slug matches URL query param values
 *
 * Image paths use Vite's asset import convention.
 * For variant-specific images, each variant carries its own `image` field.
 * The ProductCard reads variant.image (if present) and falls back to product.image.
 */

// ─── Asset imports ────────────────────────────────────────────────────────────

import imgSoapSkinCare        from '../assets/images/products/soap-skin-care.jpg';
import imgSoapAlovera         from '../assets/images/products/soap-aloevera-cool.jpg';
import imgSoapCharcoal        from '../assets/images/products/soap-charcoal-multani.jpg';
import imgSoapBaby            from '../assets/images/products/soap-baby.jpg';
import imgSoapBesan           from '../assets/images/products/soap-besan-pithi.jpg';
import imgSoapNim             from '../assets/images/products/soap-nim-aloevera.jpg';
import imgSoapMilky           from '../assets/images/products/soap-milky.jpg';
import imgStarFacial8g        from '../assets/images/products/soap-star-facial-8g.jpg';
import imgStarFacial22g       from '../assets/images/products/soap-star-facial-22g.jpg';
import imgStarFacial50g       from '../assets/images/products/soap-star-facial-50g.jpg';
import imgHerbalFaceGel       from '../assets/images/products/herbal-face-gel.jpg';
import imgHerbalOil           from '../assets/images/products/herbal-oil.jpg';
import imgHerbalOil200ml      from '../assets/images/products/200mloil.jpeg';
import imgHerbalOil500ml      from '../assets/images/products/500mloil.jpeg';
import imgHerbalShampoo       from '../assets/images/products/herbal-shampoo.jpg';
import imgHerbalShampoo200ml  from '../assets/images/products/200mlshampoo.jpeg';
import imgHerbalShampoo500ml  from '../assets/images/products/500mlshampoo.jpeg';
import imgSoapHoney           from '../assets/images/products/soap-honey.jpg';

// All product images are now available.

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'all',      label: 'All' },
  { id: 'soap',     label: 'Soap' },
  { id: 'hair-oil', label: 'Hair Oil' },
  { id: 'shampoo',  label: 'Shampoo' },
  { id: 'face-gel', label: 'Face Gel' },
];

// ─── Products ─────────────────────────────────────────────────────────────────

export const products = [

  // ── SOAPS ──────────────────────────────────────────────────────────────────
  {
    id: 'soap-skin-care',
    name: 'Skin Care Soap',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    price: 30,
    unit: '50g',
    hasVariants: false,
    featured: false,
    image: imgSoapSkinCare,
    imageStyle: 'cover',
    description: '',
    ingredients: '',
    usage: '',
  },
  {
    id: 'soap-aloevera-cool',
    name: 'Aloevera Cool Soap',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    price: 30,
    unit: '50g',
    hasVariants: false,
    featured: false,
    image: imgSoapAlovera,
    imageStyle: 'cover',
    description: '',
    ingredients: '',
    usage: '',
  },
  {
    id: 'soap-charcoal-multani',
    name: 'Charcoal & Multani Mitti Soap',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    price: 30,
    unit: '50g',
    hasVariants: false,
    featured: false,
    image: imgSoapCharcoal,
    imageStyle: 'cover',
    description: '',
    ingredients: '',
    usage: '',
  },
  {
    id: 'soap-baby',
    name: 'Baby Soap',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    price: 40,
    unit: '50g',
    hasVariants: false,
    featured: false,
    image: imgSoapBaby,
    imageStyle: 'cover',
    description: '',
    ingredients: '',
    usage: '',
  },
  {
    id: 'soap-besan-pithi',
    name: 'Besan & Pithi Soap',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    price: 30,
    unit: '50g',
    hasVariants: false,
    featured: false,
    image: imgSoapBesan,
    imageStyle: 'cover',
    description: '',
    ingredients: '',
    usage: '',
  },
  {
    id: 'soap-honey',
    name: 'Honey Soap',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    price: 30,
    unit: '50g',
    hasVariants: false,
    featured: false,
    image: imgSoapHoney,
    imageStyle: 'cover',
    description: '',
    ingredients: '',
    usage: '',
  },
  {
    id: 'soap-nim-aloevera',
    name: 'Nim Aloevera Soap',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    price: 30,
    unit: '50g',
    hasVariants: false,
    featured: false,
    image: imgSoapNim,
    imageStyle: 'cover',
    description: '',
    ingredients: '',
    usage: '',
  },
  {
    id: 'soap-milky',
    name: 'Milky Soap',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    price: 70,
    unit: '50g',
    hasVariants: false,
    featured: true,
    image: imgSoapMilky,
    imageStyle: 'cover',
    description: '',
    ingredients: '',
    usage: '',
  },
  {
    id: 'soap-star-facial',
    name: 'Star Facial Soap',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    price: null,
    unit: null,
    hasVariants: true,
    imageStyle: 'cover',
    variants: [
      { id: 'star-facial-8g',  label: '8g',  price: 10,  image: imgStarFacial8g  },
      { id: 'star-facial-22g', label: '22g', price: 25,  image: imgStarFacial22g },
      { id: 'star-facial-50g', label: '50g', price: 60,  image: imgStarFacial50g },
    ],
    image: imgStarFacial50g,
    featured: true,
    description: '',
    ingredients: '',
    usage: '',
  },

  // ── HAIR OIL ───────────────────────────────────────────────────────────────
  {
    id: 'herbal-oil',
    name: 'Herbal Oil',
    category: 'hair-oil',
    categoryLabel: 'Hair Oil',
    price: null,
    unit: null,
    hasVariants: true,
    variants: [
      { id: 'herbal-oil-100ml', label: '100ml', price: 140, image: imgHerbalOil },
      { id: 'herbal-oil-200ml', label: '200ml', price: 280, image: imgHerbalOil200ml },
      { id: 'herbal-oil-500ml', label: '500ml', price: 700, image: imgHerbalOil500ml },
    ],
    image: imgHerbalOil,
    featured: true,
    imageStyle: 'contain',
    description: '',
    ingredients: '',
    usage: '',
  },

  // ── SHAMPOO ────────────────────────────────────────────────────────────────
  {
    id: 'herbal-shampoo',
    name: 'Herbal Shampoo',
    category: 'shampoo',
    categoryLabel: 'Shampoo',
    price: null,
    unit: null,
    hasVariants: true,
    variants: [
      { id: 'herbal-shampoo-100ml', label: '100ml', price: 70,  image: imgHerbalShampoo },
      { id: 'herbal-shampoo-200ml', label: '200ml', price: 140, image: imgHerbalShampoo200ml },
      { id: 'herbal-shampoo-500ml', label: '500ml', price: 350, image: imgHerbalShampoo500ml },
    ],
    image: imgHerbalShampoo,
    featured: false,
    imageStyle: 'contain',
    description: '',
    ingredients: '',
    usage: '',
  },

  // ── FACE GEL ───────────────────────────────────────────────────────────────
  {
    id: 'herbal-face-gel',
    name: 'Herbal Face Gel',
    category: 'face-gel',
    categoryLabel: 'Face Gel',
    price: null,
    unit: null,
    hasVariants: true,
    variants: [
      { id: 'herbal-face-gel-100ml', label: '100ml', price: 50,  image: imgHerbalFaceGel },
      { id: 'herbal-face-gel-200ml', label: '200ml', price: 100, image: imgHerbalFaceGel },
      { id: 'herbal-face-gel-500ml', label: '500ml', price: 250, image: imgHerbalFaceGel },
    ],
    image: imgHerbalFaceGel,
    featured: true,
    imageStyle: 'contain',
    description: '',
    ingredients: '',
    usage: '',
  },
];

export const featuredProducts = products.filter((p) => p.featured);
