/**
 * STAR Herbal Product Catalog
 *
 * Image naming convention: <product-name>-<size>.webp
 * Pack images (wholesale / homepage section only): <product-name>-pack.webp
 * Branded bottle images (shampoo + oil): <product-name>-branded.webp
 *
 * Rule: product.image and variant.image ALWAYS point to the original/retail image.
 *       packImage field (on variant or product) is used ONLY by the wholesale page
 *       and homepage wholesale section — never shown on retail pages.
 *
 * Wholesale eligibility:
 *   - Soaps:   100g variants only (combined quantity tiers)
 *   - Shampoo: all sizes (per-product minimums)
 *   - Oil:     all sizes (per-product minimums)
 */

// ─── Asset imports ────────────────────────────────────────────────────────────

// Skin Care Soap
import imgSoapSkinCare50g    from '../assets/images/products/skin-care-soap-50g.webp';
import imgSoapSkinCare100g   from '../assets/images/products/skin-care-soap-100g.webp';
import imgSoapSkinCarePack   from '../assets/images/products/skin-care-soap-pack.webp';

// Aloevera Cool Soap
import imgSoapAlovera50g     from '../assets/images/products/aloevera-cool-soap-50g.webp';
import imgSoapAlovera100g    from '../assets/images/products/aloevera-cool-soap-100g.webp';
import imgSoapAloveraPack    from '../assets/images/products/aloevera-cool-soap-pack.webp';

// Charcoal & Multani Mitti Soap
import imgSoapCharcoal50g    from '../assets/images/products/charcoal-multani-mitti-soap-50g.webp';
import imgSoapCharcoal100g   from '../assets/images/products/charcoal-multani-mitti-soap-100g.webp';
import imgSoapCharcoalPack   from '../assets/images/products/charcoal-multani-mitti-soap-pack.webp';

// Baby Soap
import imgSoapBaby50g        from '../assets/images/products/baby-soap-50g.webp';
import imgSoapBaby100g       from '../assets/images/products/baby-soap-100g.webp';
import imgSoapBabyPack       from '../assets/images/products/baby-soap-pack.webp';

// Neem Aloevera Soap
import imgSoapNeem50g        from '../assets/images/products/neem-aloevera-soap-50g.webp';
import imgSoapNeem100g       from '../assets/images/products/neem-aloevera-soap-100g.webp';
import imgSoapNeemPack       from '../assets/images/products/neem-aloevera-soap-pack.webp';

// Milky Soap
import imgSoapMilky50g       from '../assets/images/products/milky-soap-50g.webp';
import imgSoapMilkyPack      from '../assets/images/products/milky-soap-pack.webp';

// Body Whitening Soap (100g only)
import imgSoapWhitening100g  from '../assets/images/products/body-whitening-soap-100g.webp';
import imgSoapWhiteningPack  from '../assets/images/products/body-whitening-soap-pack.webp';

// Herbal Shampoo — branded images (new, for retail + wholesale)
import imgShampoo100ml       from '../assets/images/products/herbal-shampoo-100ml-branded.webp';
import imgShampoo250ml       from '../assets/images/products/herbal-shampoo-250ml-branded.webp';
import imgShampoo500ml       from '../assets/images/products/herbal-shampoo-500ml-branded.webp';

// Herbal Oil — branded images (new); 200ml product is now 250ml
import imgOil100ml           from '../assets/images/products/herbal-oil-100ml-branded.webp';
import imgOil250ml           from '../assets/images/products/herbal-oil-250ml-branded.webp';
import imgOil500ml           from '../assets/images/products/herbal-oil-500ml-branded.webp';

// Face Gel & Face Wash
import imgHerbalFaceGel      from '../assets/images/products/herbal-face-gel-100ml.webp';
import imgHerbalFaceWash     from '../assets/images/products/herbal-face-wash-120ml.webp';

// ─── Wholesale Pricing Config ─────────────────────────────────────────────────
//
// Soaps (100g, combined quantity across all 100g soaps in cart):
//   1 unit        → ₹80  (no GST — below minimum)
//   50–100 units  → ₹65  + 5% GST
//   101–500 units → ₹60  + 5% GST
//   501–999 units → ₹55  + 5% GST
//
// Shampoo & Oil: fixed wholesale price + 5% GST, per-product minimums
//
export const WHOLESALE_SOAP_TIERS = [
  { min: 501, max: 999, pricePerUnit: 55, gstRate: 0.05 },
  { min: 101, max: 500, pricePerUnit: 60, gstRate: 0.05 },
  { min: 50,  max: 100, pricePerUnit: 65, gstRate: 0.05 },
  { min: 1,   max: 49,  pricePerUnit: 80, gstRate: 0     }, // below minimum — no GST
];

export const WHOLESALE_SOAP_MIN_QTY = 50; // combined across all 100g soaps

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
    image: imgSoapSkinCare50g,   // retail default (first variant)
    imageStyle: 'contain',
    variants: [
      { id: 'soap-skin-care-50g',  label: '50g',  price: null, image: imgSoapSkinCare50g },
      {
        id: 'soap-skin-care-100g', label: '100g', price: null,
        image: imgSoapSkinCare100g,          // retail image — unchanged
        packImage: imgSoapSkinCarePack,      // wholesale page only
        wholesaleEligible: true,
      },
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
    image: imgSoapAlovera50g,
    imageStyle: 'contain',
    variants: [
      { id: 'soap-aloevera-cool-50g',  label: '50g',  price: null, image: imgSoapAlovera50g },
      {
        id: 'soap-aloevera-cool-100g', label: '100g', price: null,
        image: imgSoapAlovera100g,
        packImage: imgSoapAloveraPack,
        wholesaleEligible: true,
      },
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
      { id: 'soap-charcoal-multani-50g',  label: '50g',  price: null, image: imgSoapCharcoal50g },
      {
        id: 'soap-charcoal-multani-100g', label: '100g', price: null,
        image: imgSoapCharcoal100g,
        packImage: imgSoapCharcoalPack,
        wholesaleEligible: true,
      },
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
    image: imgSoapBaby50g,
    imageStyle: 'contain',
    variants: [
      { id: 'soap-baby-50g',  label: '50g',  price: null, image: imgSoapBaby50g },
      {
        id: 'soap-baby-100g', label: '100g', price: null,
        image: imgSoapBaby100g,
        packImage: imgSoapBabyPack,
        wholesaleEligible: true,
      },
    ],
    benefitsEn: 'Suitable for babies of all ages — nourishes and moisturises delicate skin with gentle massage ingredients.',
    benefitsGu: '૦ થી કોઈ પણ age ના baby ની skin ને massage ingredients થી moisture કરી પોષણ આપે.',
    ingredientsEn: 'Honey, Gram Flour (Besan), Pithi, Goat Milk, Massage Ingredients.',
    ingredientsGu: 'મધ, બેસન, પિઠી, બકરી નું દૂધ, Massage Ingredients.',
  },

  {
    id: 'soap-nim-aloevera',
    name: 'Neem Aloevera Soap',
    nameGu: 'નીમ એલોવેરા સાબુ',
    category: 'soap',
    categoryLabel: 'Handmade Soap',
    categoryLabelGu: 'હાથથી બનાવેલ સાબુ',
    price: null,
    unit: null,
    hasVariants: true,
    featured: false,
    image: imgSoapNeem50g,
    imageStyle: 'contain',
    variants: [
      { id: 'soap-nim-aloevera-50g',  label: '50g',  price: null, image: imgSoapNeem50g },
      {
        id: 'soap-nim-aloevera-100g', label: '100g', price: null,
        image: imgSoapNeem100g,
        packImage: imgSoapNeemPack,
        wholesaleEligible: true,
      },
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
    unit: null,
    hasVariants: true,
    featured: true,
    image: imgSoapMilky50g,
    imageStyle: 'cover',
    variants: [
      { id: 'soap-milky-50g',  label: '50g',  price: null, image: imgSoapMilky50g },
      {
        id: 'soap-milky-100g', label: '100g', price: null,
        image: imgSoapMilky50g,
        packImage: imgSoapMilkyPack,
        wholesaleEligible: true,
      },
    ],
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
    image: imgSoapWhitening100g,    // retail image — unchanged
    packImage: imgSoapWhiteningPack, // wholesale page only
    wholesaleEligible: true,
    imageStyle: 'contain',
    benefitsEn: 'Removes dark spots and blemishes from the body — gives the skin a radiant whitening glow.',
    benefitsGu: 'Body ના દાઘ ધબ્બા મિટાડી ને body ને glow આપે.',
    ingredientsEn: 'Goat Milk, Kojic Acid — plus 7 more natural ingredients.',
    ingredientsGu: 'બકરી નું દૂધ, Kojic Acid — ઉપરાંત ૭ વસ્તુ થી બનેલો Soap.',
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
    featured: true,
    image: imgOil100ml,
    imageStyle: 'contain',
    variants: [
      {
        id: 'herbal-oil-100ml', label: '100ml', price: null,
        image: imgOil100ml,
        wholesaleEligible: true,
        wholesalePrice: 140,
        wholesaleMinQty: 50,
        gstRate: 0.05,
      },
      {
        id: 'herbal-oil-250ml', label: '250ml', price: null,
        image: imgOil250ml,
        wholesaleEligible: true,
        wholesalePrice: 340,
        wholesaleMinQty: 20,
        gstRate: 0.05,
      },
      {
        id: 'herbal-oil-500ml', label: '500ml', price: null,
        image: imgOil500ml,
        wholesaleEligible: true,
        wholesalePrice: 660,
        wholesaleMinQty: 10,
        gstRate: 0.05,
      },
    ],
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
    featured: true,
    image: imgShampoo100ml,
    imageStyle: 'contain',
    variants: [
      {
        id: 'herbal-shampoo-100ml', label: '100ml', price: null,
        image: imgShampoo100ml,
        wholesaleEligible: true,
        wholesalePrice: 70,
        wholesaleMinQty: 50,
        gstRate: 0.05,
      },
      {
        id: 'herbal-shampoo-250ml', label: '250ml', price: null,
        image: imgShampoo250ml,
        wholesaleEligible: true,
        wholesalePrice: 175,
        wholesaleMinQty: 25,
        gstRate: 0.05,
      },
      {
        id: 'herbal-shampoo-500ml', label: '500ml', price: null,
        image: imgShampoo500ml,
        wholesaleEligible: true,
        wholesalePrice: 340,
        wholesaleMinQty: 10,
        gstRate: 0.05,
      },
    ],
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
    featured: true,
    image: imgHerbalFaceGel,
    imageStyle: 'contain',
    variants: [
      { id: 'herbal-face-gel-100ml', label: '100ml', price: null, image: imgHerbalFaceGel },
      { id: 'herbal-face-gel-200ml', label: '200ml', price: null, image: imgHerbalFaceGel },
      { id: 'herbal-face-gel-500ml', label: '500ml', price: null, image: imgHerbalFaceGel },
    ],
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
