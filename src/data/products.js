/**
 * STAR Herbal Product Catalog
 */

// ─── Asset imports ────────────────────────────────────────────────────────────

import imgSoapSkinCare        from '../assets/images/products/skin-care-soap-50g-30rs.jpg';
import imgSoapSkinCare80g     from '../assets/images/products/skin-care-soap-80g-50rs.jpeg';
import imgSoapSkinCare100g    from '../assets/images/products/skin-care-soap-100g-60rs.jpeg';
import imgSoapAlovera         from '../assets/images/products/aloevera-cool-soap-50g-30rs.jpg';
import imgSoapAlovera80g      from '../assets/images/products/aloevera-cool-soap-80g-50rs.jpeg';
import imgSoapAlovera100g     from '../assets/images/products/aloevera-cool-soap-100g-60rs.jpeg';
import imgSoapCharcoal        from '../assets/images/products/charcoal-multani-mitti-soap-50g-30rs.jpg';
import imgSoapCharcoal100g     from '../assets/images/products/charcoal-multani-mitti-soap-100g-60rs.jpeg';
import imgSoapBaby            from '../assets/images/products/baby-soap-50g-30rs.jpg';
import imgSoapBaby80g         from '../assets/images/products/baby-soap-80g-50rs.jpeg';
import imgSoapBaby100g        from '../assets/images/products/baby-soap-100g-60rs.jpeg';
import imgSoapBesan           from '../assets/images/products/besan-pithi-soap-50g-30rs.jpg';
import imgSoapNim             from '../assets/images/products/nim-aloevera-soap-50g-30rs.jpg';
import imgSoapNim80g          from '../assets/images/products/nim-aloevera-soap-80g-50rs.jpeg';
import imgSoapNim100g         from '../assets/images/products/nim-aloevera-soap-100g-60rs.jpeg';
import imgSoapWhitening       from '../assets/images/products/body-whitening-soap-100g-70rs.jpeg';
import imgSoapMilky           from '../assets/images/products/milky-soap-50g-70rs.jpg';
import imgStarFacial8g        from '../assets/images/products/star-facial-soap-8g-10rs.jpg';
import imgStarFacial22g       from '../assets/images/products/star-facial-soap-22g-25rs.jpg';
import imgStarFacial50g       from '../assets/images/products/star-facial-soap-50g-60rs.jpg';
import imgHerbalFaceGel       from '../assets/images/products/herbal-face-gel-100ml-50rs.jpg';
import imgHerbalFaceWash      from '../assets/images/products/herbal-face-wash-120ml-100rs.jpeg';
import imgHerbalOil           from '../assets/images/products/herbal-oil-100ml-140rs.jpeg';
import imgHerbalOil200ml      from '../assets/images/products/herbal-oil-200ml-280rs.jpeg';
import imgHerbalOil500ml      from '../assets/images/products/herbal-oil-500ml-700rs.jpeg';
import imgHerbalShampoo       from '../assets/images/products/herbal-shampoo-100ml-70rs.jpeg';
import imgHerbalShampoo200ml  from '../assets/images/products/herbal-shampoo-200ml-140rs.jpeg';
import imgHerbalShampoo500ml  from '../assets/images/products/herbal-shampoo-500ml-350rs.jpeg';
import imgSoapHoney           from '../assets/images/products/honey-soap-50g-30rs.jpg';
import imgSoapKesarChandan8g   from '../assets/images/products/kesar-chandan-soap-8g-15rs.jpeg';
import imgSoapKesarChandan20g  from '../assets/images/products/kesar-chandan-soap-20g-30rs.jpeg';
import imgSoapKesarChandan100g from '../assets/images/products/kesar-chandan-soap-100g-100rs.jpeg';

// ─── Products ─────────────────────────────────────────────────────────────────

export const products = [

  // ── SOAPS ──────────────────────────────────────────────────────────────────
  {
    id: 'soap-skin-care',
    name: 'Skin Care Soap',
    nameGu: 'સ્કિન કેર સાબુ',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    categoryLabelGu: 'હાથથી બનાવેલ સાબુ',
    price: null,
    unit: null,
    hasVariants: true,
    featured: true,
    image: imgSoapSkinCare,
    imageStyle: 'contain',
    variants: [
      { id: 'soap-skin-care-50g',  label: '50g',  price: null, image: imgSoapSkinCare },
      { id: 'soap-skin-care-80g',  label: '80g',  price: null, image: imgSoapSkinCare80g },
      { id: 'soap-skin-care-100g', label: '100g', price: null, image: imgSoapSkinCare100g },
    ],
    benefitsEn: 'Removes blackheads, pimples and dark spots on the face, neck and elbows — provides whitening glow to the skin.',
    benefitsGu: 'ચહેરા ઉપર ના કાળા કુંડળ, ફોડલી આને ગરદન–કોહની ની કાળાશ મિટાવી whitening glow કરે.',
    ingredientsEn: 'Coffee Powder, Chavala Powder, Potato Powder, Mulethi Powder — plus 14 more natural ingredients.',
    ingredientsGu: 'કૉફી પાઉડર, ચાવળા પાઉડર, બટેટા પાઉડર, મુલઠી પાઉડર — ઉપરાંત ૧૪ વસ્તુઓ થી બનેલો Skin Care.',
  },
  {
    id: 'soap-aloevera-cool',
    name: 'Aloevera Cool Soap',
    nameGu: 'એલોવેરા કૂલ સાબુ',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    categoryLabelGu: 'હાથથી બનાવેલ સાબુ',
    price: null,
    unit: null,
    hasVariants: true,
    featured: false,
    image: imgSoapAlovera,
    imageStyle: 'contain',
    variants: [
      { id: 'soap-aloevera-cool-50g',  label: '50g',  price: null, image: imgSoapAlovera },
      { id: 'soap-aloevera-cool-80g',  label: '80g',  price: null, image: imgSoapAlovera80g },
      { id: 'soap-aloevera-cool-100g', label: '100g', price: null, image: imgSoapAlovera100g },
    ],
    benefitsEn: 'Relieves heat, body odour and itching — provides a cool and refreshing sensation on the scalp and body.',
    benefitsGu: 'માથા આને શરીર ની આળ, ગરમી આને ખંજવાળ થી મુક્ત કરી ઠંડક આપે.',
    ingredientsEn: 'Aloevera, Coconut Oil, Glycerin — plus 6 more natural ingredients.',
    ingredientsGu: 'એલોવેરા, નાળિયેર તેલ, ગ્લિસરિન — ઉપરાંત ૬ વસ્તુઓ થી બનેલો Aloevera Cool.',
  },
  {
    id: 'soap-charcoal-multani',
    name: 'Charcoal & Multani Mitti Soap',
    nameGu: 'ચારકોલ & મુલ્તાની મિટ્ટી સાબુ',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    categoryLabelGu: 'હાથથી બનાવેલ સાબુ',
    price: null,
    unit: null,
    hasVariants: true,
    featured: false,
    image: imgSoapCharcoal100g,
    imageStyle: 'contain',
    variants: [
      { id: 'soap-charcoal-multani-50g',  label: '50g',  price: null, image: imgSoapCharcoal },
      { id: 'soap-charcoal-multani-100g', label: '100g', price: null, image: imgSoapCharcoal100g },
    ],
    benefitsEn: 'Controls oily skin, removes blemishes, pimples and acne — keeps the skin free from excess sweat and impurities.',
    benefitsGu: 'ચહેરા ને oily ત્વચા થી મુક્ત કરી દાઘ, ફોડલી, ખીલ આને વારંવાર આવતા પરસેવા ના ટીપા મુક્ત કરે.',
    ingredientsEn: 'Charcoal, Multani Mitti, Glycerin, Rose Water — plus 5 more natural ingredients.',
    ingredientsGu: 'ચારકોલ, મુલ્તાની મિટ્ટી, ગ્લિસરિન, ગુલાબ જળ — ઉપરાંત ૫ વસ્તુ થી બનેલો Charcoal Multani Mitti.',
  },
  {
    id: 'soap-baby',
    name: 'Baby Soap',
    nameGu: 'બેબી સાબુ',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    categoryLabelGu: 'હાથથી બનાવેલ સાબુ',
    price: null,
    unit: null,
    hasVariants: true,
    featured: false,
    image: imgSoapBaby,
    imageStyle: 'contain',
    variants: [
      { id: 'soap-baby-50g',  label: '50g',  price: null, image: imgSoapBaby },
      { id: 'soap-baby-80g',  label: '80g',  price: null, image: imgSoapBaby80g },
      { id: 'soap-baby-100g', label: '100g', price: null, image: imgSoapBaby100g },
    ],
    benefitsEn: 'Suitable for babies of all ages — nourishes and moisturises delicate skin with gentle massage ingredients.',
    benefitsGu: '૦ થી કોઈ પણ age ના baby ની skin ને massage ingredients થી moisture કરી પોષણ આપે.',
    ingredientsEn: 'Honey, Gram Flour (Besan), Pithi, Goat Milk, Massage Ingredients.',
    ingredientsGu: 'મધ, બેસન, પિઠી, બકરી નું દૂધ, Massage Ingredients.',
  },
  {
    id: 'soap-besan-pithi',
    name: 'Besan & Pithi Soap',
    nameGu: 'બેસન & પિઠી સાબુ',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    categoryLabelGu: 'હાથથી બનાવેલ સાબુ',
    price: null,
    unit: '50g',
    hasVariants: false,
    featured: false,
    image: imgSoapBesan,
    imageStyle: 'cover',
    benefitsEn: 'Makes the skin soft, smooth and well-moisturised.',
    benefitsGu: 'ત્વચા ને મુલાયમ, moisture આને કોમળ બનાવે.',
    ingredientsEn: 'Gram Flour (Besan), Pithi, Coconut Oil, Rose Water — plus 4 more natural ingredients.',
    ingredientsGu: 'બેસન, પિઠી, નાળિયેર તેલ, ગુલાબ જળ — ઉપરાંત ૪ વસ્તુ થી બનેલો.',
  },
  {
    id: 'soap-honey',
    name: 'Honey Soap',
    nameGu: 'મધ સાબુ',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    categoryLabelGu: 'હાથથી બનાવેલ સાબુ',
    price: null,
    unit: '50g',
    hasVariants: false,
    featured: false,
    image: imgSoapHoney,
    imageStyle: 'cover',
    benefitsEn: 'Nourishes the skin and gives it a radiant glow.',
    benefitsGu: 'ત્વચા ને પોષણ આપી ચમકદાર બનાવે.',
    ingredientsEn: 'Honey, Coconut Oil, Vitamin E Capsule, Rose Water — plus 5 more natural ingredients.',
    ingredientsGu: 'મધ, નાળિયેર તેલ, વિટામિન E કૅપ્સ્યૂલ, ગુલાબ જળ — ઉપરાંત ૫ વસ્તુ થી બનેલો Honey.',
  },
  {
    id: 'soap-nim-aloevera',
    name: 'Nim Aloevera Soap',
    nameGu: 'નીમ એલોવેરા સાબુ',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    categoryLabelGu: 'હાથથી બનાવેલ સાબુ',
    price: null,
    unit: null,
    hasVariants: true,
    featured: false,
    image: imgSoapNim,
    imageStyle: 'contain',
    variants: [
      { id: 'soap-nim-aloevera-50g',  label: '50g',  price: null, image: imgSoapNim },
      { id: 'soap-nim-aloevera-80g',  label: '80g',  price: null, image: imgSoapNim80g },
      { id: 'soap-nim-aloevera-100g', label: '100g', price: null, image: imgSoapNim100g },
    ],
    benefitsEn: 'Removes skin impurities, pimples and protects against skin infections. Relieves body rashes and itching — keeps the body germ-free and provides a cooling effect.',
    benefitsGu: 'ત્વચા ની અશુદ્ધિઓ દૂર કરી ખીલ, ફોડલી આને ચામડી ના ચેપ સામે રક્ષણ આપે — શરીર માં થતી ધાધર, ખંજવાળ ને દૂર કરી શરીર ને કીટાણું મુક્ત કરી ઠંડક આપે.',
    ingredientsEn: 'Neem, Aloevera, Coconut Oil, Rose Water — made from natural ingredients.',
    ingredientsGu: 'નીમ, એલોવેરા, નાળિયેર તેલ, ગુલાબ જળ — કુદરતી વસ્તુઓ થી બનેલો.',
  },
  {
    id: 'soap-milky',
    name: 'Milky Soap',
    nameGu: 'મિલ્કી સાબુ',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    categoryLabelGu: 'હાથથી બનાવેલ સાબુ',
    price: null,
    unit: '50g',
    hasVariants: false,
    featured: true,
    image: imgSoapMilky,
    imageStyle: 'cover',
    benefitsEn: 'Nourishes and softens wrinkled and dry skin for people of all ages — also nourishes and smoothens thin, delicate skin.',
    benefitsGu: '૦ થી કોઈ પણ age ના વ્યક્તિ ની કરચલી વાળી & સૂકી skin ને પોષણ આપી મુલાયમ કરે — પાતળી પતળાય વાળી ચામડી ને પોષણ આપી સ્મૂથ કરે.',
    ingredientsEn: 'Sheep Ghee, Goat Milk, Cream (Malai), Glycerin, Rose Water — plus 7 more natural ingredients.',
    ingredientsGu: 'ઘેટા નું ઘી, બકરી નું દૂધ, મલાઈ, ગ્લિસરિન, ગુલાબ જળ — ઉપરાંત ૭ વસ્તુ થી બનેલો Milky.',
  },
  {
    id: 'soap-whitening',
    name: 'Body Whitening Soap',
    nameGu: 'બૉડી વ્હાઇટનિંગ સાબુ',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    categoryLabelGu: 'હાથથી બનાવેલ સાબુ',
    price: null,
    unit: '100g',
    hasVariants: false,
    featured: false,
    image: imgSoapWhitening,
    imageStyle: 'contain',
    benefitsEn: 'Removes dark spots and blemishes from the body — gives the skin a radiant whitening glow.',
    benefitsGu: 'Body ના દાઘ ધબ્બા મિટાડી ને body ને glow આપે.',
    ingredientsEn: 'Goat Milk, Kojic Acid — plus 7 more natural ingredients.',
    ingredientsGu: 'બકરી નું દૂધ, Kojic Acid — ઉપરાંત ૭ વસ્તુ થી બનેલો Soap.',
  },
  {
    id: 'soap-star-facial',
    name: 'Star Facial Soap',
    nameGu: 'સ્ટાર ફેશિયલ સાબુ',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    categoryLabelGu: 'હાથથી બનાવેલ સાબુ',
    price: null,
    unit: null,
    hasVariants: true,
    imageStyle: 'cover',
    variants: [
      { id: 'star-facial-8g',  label: '8g',  price: null,  image: imgStarFacial8g  },
      { id: 'star-facial-22g', label: '22g', price: null,  image: imgStarFacial22g },
      { id: 'star-facial-50g', label: '50g', price: null,  image: imgStarFacial50g },
    ],
    image: imgStarFacial50g,
    featured: true,
    benefitsEn: 'Moisturises the face and gives it a natural, radiant glow.',
    benefitsGu: 'ચહેરા ને moisture & કુદરતી glow કરે.',
    ingredientsEn: 'Facial Whitening Capsule, Mulethi Powder, Goat Milk, Rice Powder, Cream (Malai) — plus 7 more natural ingredients.',
    ingredientsGu: 'ફેશિયલ વ્હાઇટિંગ કૅપ્સ્યૂલ, મુલઠી પાઉડર, બકરી નું દૂધ, ચોખા નો પાઉડર, મલાઈ — ઉપરાંત ૭ વસ્તુ.',
  },
  {
    id: 'soap-kesar-chandan',
    name: 'Kesar Chandan Soap',
    nameGu: 'કેસર ચંદન સાબુ',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    categoryLabelGu: 'હાથથી બનાવેલ સાબુ',
    price: null,
    unit: null,
    hasVariants: true,
    featured: true,
    image: imgSoapKesarChandan100g,
    imageStyle: 'contain',
    variants: [
      { id: 'soap-kesar-chandan-8g',   label: '8g',   price: null,  image: imgSoapKesarChandan8g },
      { id: 'soap-kesar-chandan-20g',  label: '20g',  price: null,  image: imgSoapKesarChandan20g },
      { id: 'soap-kesar-chandan-100g', label: '100g', price: null, image: imgSoapKesarChandan100g },
    ],
    benefitsEn: '',
    benefitsGu: '',
    ingredientsEn: '',
    ingredientsGu: '',
  },

  // ── HAIR OIL ───────────────────────────────────────────────────────────────
  {
    id: 'herbal-oil',
    name: 'Herbal Oil',
    nameGu: 'હર્બલ ઓઈલ',
    category: 'hair-oil',
    categoryLabel: 'Hair Oil',
    categoryLabelGu: 'હેર ઓઈલ',
    price: null,
    unit: null,
    hasVariants: true,
    variants: [
      { id: 'herbal-oil-100ml', label: '100ml', price: null, image: imgHerbalOil },
      { id: 'herbal-oil-200ml', label: '200ml', price: null, image: imgHerbalOil200ml },
      { id: 'herbal-oil-500ml', label: '500ml', price: null, image: imgHerbalOil500ml },
    ],
    image: imgHerbalOil,
    featured: true,
    imageStyle: 'contain',
    benefitsEn: 'Makes hair dark, thick, silky, shiny, straight and long — relieves headaches, stops hair fall and eliminates dandruff.',
    benefitsGu: 'Hair ને કાળા, ઘેરા, silky, shiny, સીધા & લાંબા કરી માથા ના દુખાવા માં રાહત આપે — hair fall બંધ કરે આને dandruff થી છુટકારો આપે.',
    ingredientsEn: 'Onion, Amla, Shikakai, Bhringraj, Neem, Aloevera, Fenugreek (Methi), Hibiscus, Henna — total 25 natural ingredients.',
    ingredientsGu: 'ડુંગળી, આમળા, શીકાકાઈ, ભૃંગરાજ, લીંબડો, એલોવેરા, મેથી, જાસૂદ, મહેંદી — કુલ ૨૫ વસ્તુ થી બનેલ Herbal Oil.',
  },

  // ── SHAMPOO ────────────────────────────────────────────────────────────────
  {
    id: 'herbal-shampoo',
    name: 'Herbal Shampoo',
    nameGu: 'હર્બલ શૅમ્પૂ',
    category: 'shampoo',
    categoryLabel: 'Shampoo',
    categoryLabelGu: 'શૅમ્પૂ',
    price: null,
    unit: null,
    hasVariants: true,
    variants: [
      { id: 'herbal-shampoo-100ml', label: '100ml', price: null,  image: imgHerbalShampoo },
      { id: 'herbal-shampoo-200ml', label: '200ml', price: null, image: imgHerbalShampoo200ml },
      { id: 'herbal-shampoo-500ml', label: '500ml', price: null, image: imgHerbalShampoo500ml },
    ],
    image: imgHerbalShampoo,
    featured: true,
    imageStyle: 'contain',
    benefitsEn: 'Makes hair dark, thick, silky, shiny, straight and long — relieves headaches, stops hair fall and eliminates dandruff.',
    benefitsGu: 'Hair ને કાળા, ઘેરા, silky, shiny, સીધા & લાંબા કરી માથા ના દુખાવા માં રાહત આપે — hair fall બંધ કરે આને dandruff થી છુટકારો આપે.',
    ingredientsEn: 'Onion, Amla, Shikakai, Bhringraj, Neem, Aloevera, Fenugreek (Methi), Hibiscus, Henna — total 25 natural ingredients.',
    ingredientsGu: 'ડુંગળી, આમળા, શીકાકાઈ, ભૃંગરાજ, લીંબડો, એલોવેરા, મેથી, જાસૂદ, મહેંદી — કુલ ૨૫ વસ્તુ થી બનેલ Herbal Shampoo.',
  },

  // ── FACE GEL ───────────────────────────────────────────────────────────────
  {
    id: 'herbal-face-gel',
    name: 'Herbal Face Gel',
    nameGu: 'હર્બલ ફેસ જેલ',
    category: 'face-gel',
    categoryLabel: 'Face Gel',
    categoryLabelGu: 'ફેસ જેલ',
    price: null,
    unit: null,
    hasVariants: true,
    variants: [
      { id: 'herbal-face-gel-100ml', label: '100ml', price: null,  image: imgHerbalFaceGel },
      { id: 'herbal-face-gel-200ml', label: '200ml', price: null, image: imgHerbalFaceGel },
      { id: 'herbal-face-gel-500ml', label: '500ml', price: null, image: imgHerbalFaceGel },
    ],
    image: imgHerbalFaceGel,
    featured: true,
    imageStyle: 'contain',
    benefitsEn: 'Moisturises the face and body — removes blemishes and pimples, minimises pores and gives the skin a healthy glow.',
    benefitsGu: 'ચહેરા & body ને moisture કરી દાઘ, ફોડલી થી મુક્ત કરી છિદ્રો ને ભરી skin glow આપે.',
    ingredientsEn: 'Flax Seeds Gel, Pithi, Glycerin, Rose Water — plus 5 or more natural ingredients.',
    ingredientsGu: 'ફ્લેક્સ સીડ્સ જેલ, પિઠી, ગ્લિસરિન, ગુલાબ જળ — ઉપરાંત ૫ થી વધુ વસ્તુ થી બનેલ Gel.',
  },

  // ── FACE WASH ─────────────────────────────────────────────────────────────
  {
    id: 'herbal-face-wash',
    name: 'Herbal Face Wash',
    nameGu: 'હર્બલ ફેસ વોશ',
    category: 'face-wash',
    categoryLabel: 'Face Wash',
    categoryLabelGu: 'ફેસ વોશ',
    price: null,
    unit: '120ml',
    hasVariants: false,
    featured: true,
    image: imgHerbalFaceWash,
    imageStyle: 'contain',
    benefitsEn: '',
    benefitsGu: '',
    ingredientsEn: '',
    ingredientsGu: '',
  },
];

export const featuredProducts = products.filter((p) => p.featured);
