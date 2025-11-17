
import { Technique, Category } from './types';

export const CATEGORIES: Category[] = [
  Category.FUNDAMENTALS,
  Category.PRECISION,
  Category.TRANSIENTS,
  Category.MENS,
  Category.CREATIVE_CLASSICS
];

export const TECHNIQUES: Technique[] = [
  {
    id: 'fundamentals-one-length',
    name: 'One Length',
    category: Category.FUNDAMENTALS,
    description: 'The One Length haircut is a foundational technique creating a solid, sharp perimeter. All hair is cut to the same length, resulting in a clean, classic, and weighty look.',
    steps: [
      { stepNumber: 1, title: "Sectioning", instruction: "Create a center parting from the forehead to the nape. Then, create two horizontal partings from ear to ear, separating the hair into four clean quadrants." },
      { stepNumber: 2, title: "Establish Guideline", instruction: "Take a thin, 1/2 inch subsection at the nape. Comb the hair with zero elevation and cut a straight line. This will be your stationary guideline." },
      { stepNumber: 3, title: "Cut Back Sections", instruction: "Working in horizontal subsections, bring the hair down to the guideline with no elevation or over-direction. Cut parallel to your guideline." },
      { stepNumber: 4, title: "Cut Side Sections", instruction: "Move to the side sections. Continue taking horizontal subsections, combing the hair to its natural fall, and cutting to match the established length from the back." },
      { stepNumber: 5, title: "Cross-Check", instruction: "Once all sections are cut, cross-check the haircut by taking vertical sections and ensuring the line is perfectly even. Refine the perimeter as needed." },
    ]
  },
  {
    id: 'fundamentals-forward-graduation',
    name: 'Forward Graduation',
    category: Category.FUNDAMENTALS,
    description: 'This technique builds weight and length towards the front, creating a soft, angled-forward shape. It uses a stationary guideline at the back to achieve the graduated effect.',
    steps: [
      { stepNumber: 1, title: "Initial Parting", instruction: "Create a clean center part. Take a diagonal forward parting from the crown to just behind the ear on both sides." },
      { stepNumber: 2, title: "Create Guideline", instruction: "At the nape, take a small triangular section. Comb it to its natural fall and cut your desired line. This is the stationary guideline." },
      { stepNumber: 3, title: "Cut the Back", instruction: "Take diagonal forward sections. Over-direct each section back to the stationary guideline at the nape. Use consistent tension and elevation." },
      { stepNumber: 4, title: "Connect the Sides", instruction: "Move to the sides. Take diagonal forward sections and continue to over-direct them back to the last cut section from the back, maintaining the angle." },
      { stepNumber: 5, title: "Refine Perimeter", instruction: "Comb all hair down and visually check the angled perimeter. Point cut or blunt cut to refine and perfect the line." },
    ]
  },
  { id: 'fundamentals-natural-inversion', name: 'Natural Inversion', category: Category.FUNDAMENTALS, description: 'Natural Inversion creates soft, subtle layers by elevating the hair and cutting a line that is shorter in the center and longer on the sides.', steps: [] },
  { id: 'fundamentals-round-layer', name: 'Round Layer', category: Category.FUNDAMENTALS, description: 'Round layers remove weight while following the natural head shape, creating a soft, rounded silhouette with seamless movement and volume.', steps: [] },
  { id: 'fundamentals-square-layer', name: 'Square Layer', category: Category.FUNDAMENTALS, description: 'Square layers build a square shape, resulting in longer layers at the front and shorter layers at the back, adding texture and removing weight.', steps: [] },
  { id: 'fundamentals-vertical-graduation', name: 'Vertical Graduation', category: Category.FUNDAMENTALS, description: 'This technique builds weight in a vertical direction, often used to create height and volume in specific areas of the head.', steps: [] },
  {
    id: 'precision-classic-bob',
    name: 'Classic Bob',
    category: Category.PRECISION,
    description: 'The Classic Bob is a timeless, precision-based cut characterized by a sharp, defined line. It requires meticulous sectioning and consistent tension for a flawless finish.',
    steps: [
      { stepNumber: 1, title: "Sectioning", instruction: "Create four clean sections: a center part to the nape, and a horizontal parting from ear to ear." },
      { stepNumber: 2, title: "Guideline", instruction: "At the nape, take a clean horizontal subsection. Comb with zero elevation and cut your desired bob line." },
      { stepNumber: 3, title: "Back Sections", instruction: "Work up the back in horizontal subsections, bringing all hair down to the guideline. Maintain zero elevation." },
      { stepNumber: 4, title: "Side Sections", instruction: "Move to the sides. Use a piece of the back as a guide. Comb hair to its natural fall and continue the line from back to front." },
      { stepNumber: 5, title: "Check Balance", instruction: "Stand in front of the client and check the balance of the line from side to side. Make any necessary adjustments." },
    ]
  },
  { id: 'precision-classic-graduation', name: 'Classic Graduation', category: Category.PRECISION, description: 'A foundational precision technique that builds weight low at the nape and gradually gets longer towards the top, creating a tapered and stacked effect.', steps: [] },
  { id: 'precision-graduated-bob', name: 'Graduated Bob', category: Category.PRECISION, description: 'A variation of the classic bob that incorporates graduation at the back to create a stacked, beveled shape with a strong perimeter.', steps: [] },
  { id: 'transients-transient-cut', name: 'Transient Cut', category: Category.TRANSIENTS, description: 'A modern, versatile technique that creates seamless, blended layers with a soft, lived-in feel. Ideal for creating texture and movement.', steps: [] },
  { id: 'transients-transient-graduation', name: 'Transient Graduation', category: Category.TRANSIENTS, description: 'Combines the softness of transient layers with the structure of graduation, resulting in a textured shape with controlled volume.', steps: [] },
  { id: 'transients-transient-length', name: 'Transient Length', category: Category.TRANSIENTS, description: 'Focuses on maintaining length while introducing soft, invisible layers to remove bulk and add subtle movement.', steps: [] },
  { id: 'mens-mens-square-graduation', name: 'Men’s Square Graduation', category: Category.MENS, description: 'A classic men\'s cutting technique that builds a masculine, square shape. It typically involves scissor-over-comb work for a tailored finish.', steps: [] },
  { id: 'mens-textured-crop', name: 'Textured Crop', category: Category.MENS, description: 'A popular short men\'s haircut with a textured, messy finish on top and often faded or tapered sides. Perfect for a modern, stylish look.', steps: [] },
  { id: 'creative-classics-classic-undercut', name: 'Classic Undercut', category: Category.CREATIVE_CLASSICS, description: 'Features shorter sides and back that are disconnected from the longer hair on top, creating a bold, high-contrast style.', steps: [] },
  { id: 'creative-classics-the-bevel', name: 'The Bevel', category: Category.CREATIVE_CLASSICS, description: 'A technique used to create a soft, turned-under edge on the perimeter of a haircut, adding polish and shape to bobs and one-length styles.', steps: [] },
];
