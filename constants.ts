
import { Technique, TechniqueCategory } from './types';

export const CATEGORIES: TechniqueCategory[] = [
  TechniqueCategory.FUNDAMENTALS,
  TechniqueCategory.PRECISIONS,
  TechniqueCategory.TRANSIENTS,
  TechniqueCategory.MENS,
  TechniqueCategory.CREATIVE_CLASSICS,
];

// INSTRUCTIONS FOR LOCAL IMAGES:
// 1. Create a folder named 'public' in your project root if it doesn't exist.
// 2. Inside 'public', create a folder named 'images'.
// 3. Move your image files into 'public/images/'.
// 4. Update the 'imageUrl' below to match your filenames (e.g., '/images/my-photo.jpg').

export const TECHNIQUES: Technique[] = [
  // Fundamentals
  {
    id: 'one-length',
    title: 'One Length',
    category: TechniqueCategory.FUNDAMENTALS,
    description: 'A foundational technique creating a solid, clean line. Essential for mastering precision and control.',
    imageUrl: '/images/one-length.jpeg', 
    steps: [
      { 
        title: 'Prepare the Hair and Observe the Natural Fall', 
        instructions: 'Ensure the hair is fully wet and evenly saturated, then remove all tangles. Comb the hair straight down to observe its natural fall before cutting.',
        imageUrl: '/images/Hair Preparation.png'
      },
      { 
        title: 'Create the Center Partings', 
        instructions: 'Create a clean, straight parting from the forehead to the nape. This divides the head evenly into two balanced halves.',
        videoUrl: '/videos/One Length V2.mp4'
      },
      { 
        title: 'Create Ear-to-Ear Partings', 
        instructions: 'Create an ear-to-ear parting through the crown area. This clearly separates the front and back sections of the head.',
        videoUrl: '/videos/One Length V3.mp4'
      },
      { 
        title: 'Secure Four Quadrants', 
        instructions: 'Divide the head into four clear quadrants using the partings. Secure each section with clips to maintain control and precision.',
        videoUrl: '/videos/One Length V4.mp4'
      },
      { 
        title: 'Release the Nape Area', 
        instructions: 'Begin by releasing the center nape area at the back of the head. This area is used to establish and control the initial cutting guideline.',
        videoUrl: '/videos/One Length V5.mp4'
      },
      { 
        title: 'Take the First Nape Subsection', 
        instructions: 'Take a thin horizontal subsection at the center of the nape. Comb it straight down in its natural fall for accuracy.',
        videoUrl: '/videos/One Length V6.mp4'
      },
      { 
        title: 'Release the Next Subsection and Cut to the Stationary Guideline', 
        instructions: 'Release the next horizontal subsection above the guideline. Comb it down and cut bluntly to match the stationary guideline exactly.',
        videoUrl: '/videos/One Length V7.mp4'
      },
      { 
        title: 'Work Up Through the Back', 
        instructions: 'Continue releasing horizontal subsections moving upward toward the crown. Maintain the same cutting technique to preserve a consistent one length.',
        videoUrl: '/videos/One Length V8.mp4'
      },
      { 
        title: 'Complete the Back Area', 
        instructions: 'Ensure the entire back section forms a solid, even length. Check for balance and a clean weight line across the back.',
        videoUrl: '/videos/One Length V9.mp4'
      },
      { 
        title: 'Release One Side of the Section', 
        instructions: 'Release one side section after completing the back area. The back guideline should be clearly visible for reference.',
        videoUrl: '/videos/One Length V10.mp4'
      },
      { 
        title: 'Take a Vertical Side Section', 
        instructions: 'Take a vertical subsection near the ear on the released side. Comb the hair straight down following its natural fall.',
        videoUrl: '/videos/One Length V11.mp4'
      },
      { 
        title: 'Connect the Side to the Back and Repeat on the Opposite Side', 
        instructions: 'Match the side section to the back guideline and cut bluntly. Repeat the same process on the opposite side to maintain symmetry.',
        videoUrl: '/videos/One Length V12.mp4'
      },
      { 
        title: 'Cross-Check the Hair and Refine the Perimeter', 
        instructions: 'Comb hair in multiple directions to check consistency and balance. Refine the perimeter to achieve a clean, sharp one-length finish.',
        videoUrl: '/videos/One Length V13.mp4'
      },
    ],
  },
  {
    id: 'forward-graduation',
    title: 'Forward Graduation',
    category: TechniqueCategory.FUNDAMENTALS,
    description: 'Builds weight towards the face, creating a soft, angled shape that frames the features beautifully.',
    imageUrl: '/images/forward-graduation.jpeg',
    steps: [
      { title: 'Initial Sectioning', instructions: 'Section the hair from ear to ear. Begin working on the back section first.' },
      { title: 'Creating the Guideline', instructions: 'Take a vertical section at the center back. Elevate the hair to 45 degrees and cut a guideline.' },
      { title: 'Pivoting Sections', instructions: 'Take pivoting sections from the center back, over-directing each section to the previous one to build weight forward.' },
      { title: 'Blending', instructions: 'Cross-check the graduation to ensure a seamless blend and consistent angle.' },
    ],
  },
  {
    id: 'natural-inversion',
    title: 'Natural Inversion',
    category: TechniqueCategory.FUNDAMENTALS,
    description: 'A technique to create a subtle, soft layer at the perimeter, reducing weight without visible layering.',
    imageUrl: '/images/natural-inversion.jpeg',
    steps: [
        { title: 'Sectioning', instructions: 'Section hair into standard four quadrants.'},
        { title: 'Guideline', instructions: 'Create a stationary guideline at the desired length.'},
        { title: 'Inversion', instructions: 'Slightly elevate and over-direct sections to the guideline to create the inversion.'},
    ],
  },
  {
    id: 'round-layer',
    title: 'Round Layer',
    category: TechniqueCategory.FUNDAMENTALS,
    description: 'Creates soft, cascading layers that follow the head shape, removing weight and adding movement.',
    imageUrl: '/images/round-layer.jpeg',
    steps: [
        { title: 'Sectioning', instructions: 'Create a profile parting from the forehead to the nape, and a radial parting from ear to ear.' },
        { title: 'Central Guideline', instructions: 'Take a central vertical section at the back. Elevate to 90 degrees and cut your guide.' },
        { title: 'Working in Sections', instructions: 'Work in pivoting sections around the head, pulling each section to the stationary central guide.' },
        { title: 'Final Refinement', instructions: 'Cross-check the layers for balance and refine the perimeter.' },
    ],
  },
  {
    id: 'square-layer',
    title: 'Square Layer',
    category: TechniqueCategory.FUNDAMENTALS,
    description: 'A technique that builds a square shape, resulting in corner-heavy layers with a strong, modern edge.',
    imageUrl: '/images/square-layer.jpeg',
    steps: [
        { title: 'Sectioning', instructions: 'Establish a horseshoe section around the top of the head.' },
        { title: 'Create the Guide', instructions: 'Take a central section on top. Elevate straight up and cut a horizontal line. This is your guide.' },
        { title: 'Connecting the Top', instructions: 'Work in sections across the top, pulling everything up to your stationary guide.' },
        { title: 'Connecting the Sides', instructions: 'Bring the side sections up vertically to meet the top guide, creating the square shape.' },
    ],
  },
  {
    id: 'vertical-graduation',
    title: 'Vertical Graduation',
    category: TechniqueCategory.FUNDAMENTALS,
    description: 'Builds weight in a vertical manner, often used for shorter shapes to create texture and lift.',
    imageUrl: '/images/vertical-graduation.jpeg',
    steps: [
        { title: 'Sectioning', instructions: 'Take vertical sections starting at the nape.'},
        { title: 'Cutting', instructions: 'Use a consistent elevation and finger angle to build graduation vertically.'},
        { title: 'Cross-Check', instructions: 'Check the balance and graduation horizontally.'},
    ],
  },
  // Precisions
  {
    id: 'classic-bob',
    title: 'Classic Bob',
    category: TechniqueCategory.PRECISIONS,
    description: 'The epitome of precision cutting. A timeless, sharp silhouette that demands technical excellence.',
    imageUrl: '/images/classic-bob.jpeg',
    steps: [
      { title: 'Nape Sectioning', instructions: 'Create a V-shaped section at the nape of the neck.' },
      { title: 'Guideline', instructions: 'Establish a precise, zero-tension guideline at the desired length.' },
      { title: 'Working Up', instructions: 'Take clean, horizontal sections, combing hair to its natural fall and cutting on top of the guide.' },
      { title: 'Refining the Perimeter', instructions: 'Use the fine teeth of the comb to perfect the baseline, ensuring it is flawlessly sharp.' },
    ],
  },
  {
    id: 'classic-graduation',
    title: 'Classic Graduation',
    category: TechniqueCategory.PRECISIONS,
    description: 'A timeless technique building a soft wedge of weight at the nape for a sophisticated look.',
    imageUrl: '/images/classic-graduation.jpeg',
    steps: [
        { title: 'Sectioning', instructions: 'Begin with diagonal back sections at the nape.'},
        { title: 'Establishing weight', instructions: 'Use 45-degree elevation to build the graduated shape.'},
        { title: 'Blending', instructions: 'Ensure a seamless transition from the nape to the sides.'},
    ],
  },
  {
    id: 'graduated-bob',
    title: 'Graduated Bob',
    category: TechniqueCategory.PRECISIONS,
    description: 'A sophisticated shape that builds weight in the back, creating a beautiful, curved line.',
    imageUrl: '/images/graduated-bob.jpeg',
    steps: [
      { title: 'Initial Section', instructions: 'Start with a diagonal forward section at the nape.' },
      { title: 'Build Graduation', instructions: 'Elevate the hair to 45 degrees, creating a buildup of weight.' },
      { title: 'Side Sections', instructions: 'Continue the graduation into the sides, maintaining a consistent elevation and finger angle.' },
      { title: 'Top Layer', instructions: 'Connect the top layer to the graduation, ensuring a smooth, rounded shape.' },
    ],
  },
  // Transients
  {
    id: 'transient-cut',
    title: 'Transient Cut',
    category: TechniqueCategory.TRANSIENTS,
    description: 'A versatile, disconnected cut that allows for texture and movement while maintaining a structured perimeter.',
    imageUrl: '/images/transient-cut.jpeg',
    steps: [
        { title: 'Sectioning the Disconnection', instructions: 'Separate the top section from the bottom with a clear parting.' },
        { title: 'Cutting the Perimeter', instructions: 'Cut the bottom section to the desired length and shape.' },
        { title: 'Layering the Top', instructions: 'Work on the top section independently, layering it to create texture and movement.' },
        { title: 'Blending Visually', instructions: 'Detail the cut, visually blending the disconnected areas for a cohesive look.' },
    ],
  },
  {
    id: 'transient-graduation',
    title: 'Transient Graduation',
    category: TechniqueCategory.TRANSIENTS,
    description: 'A modern cut combining graduation with disconnection for a high-fashion, versatile result.',
    imageUrl: '/images/transient-graduation.jpeg',
    steps: [
        { title: 'Sectioning', instructions: 'Isolate the areas for graduation and disconnection.'},
        { title: 'Graduation', instructions: 'Apply graduation to the lower sections.'},
        { title: 'Disconnection', instructions: 'Cut the top sections with a disconnected length for styling versatility.'},
    ],
  },
  {
    id: 'transient-length',
    title: 'Transient Length',
    category: TechniqueCategory.TRANSIENTS,
    description: 'Maintains length while introducing disconnected layers, creating an illusion of a one-length cut with hidden texture.',
    imageUrl: '/images/transient-length.jpeg',
    steps: [
        { title: 'Perimeter', instructions: 'Establish a strong, one-length perimeter.'},
        { title: 'Internal Layers', instructions: 'Introduce shorter, disconnected layers internally to remove weight.'},
        { title: 'Visual Blend', instructions: 'Detail the cut to ensure the layers are hidden when the hair is at natural fall.'},
    ],
  },
  // Mens
  {
    id: 'mens-square-graduation',
    title: "Men's Square Graduation",
    category: TechniqueCategory.MENS,
    description: "A classic men's cutting technique creating a lean, square shape that is masculine and versatile.",
    imageUrl: '/images/mens-square-graduation.jpeg',
    steps: [
        { title: 'Sides and Back', instructions: 'Use a clipper-over-comb or scissor-over-comb technique to build a square shape.'},
        { title: 'Top', instructions: 'Connect the top to the sides, maintaining the square silhouette.'},
        { title: 'Refinement', instructions: 'Refine the outline and texture for a clean finish.'},
    ],
  },
  {
    id: 'textured-crop',
    title: 'Textured Crop',
    category: TechniqueCategory.MENS,
    description: "A modern, fashionable men's cut featuring a sharp fringe and internal texture for a lived-in feel.",
    imageUrl: '/images/textured-crop.jpeg',
    steps: [
      { title: 'Clipper Work', instructions: 'Use a clipper-over-comb technique to create a tight fade on the back and sides.' },
      { title: 'Establishing the Fringe', instructions: 'Cut a strong, blunt fringe line at the front.' },
      { title: 'Adding Texture', instructions: 'Point-cut into the top section to remove weight and create separation.' },
      { title: 'Refining', instructions: 'Detail the hairline and blend the fade for a seamless finish.' },
    ],
  },
  // Creative Classics
  {
    id: 'classic-undercut',
    title: 'Classic Undercut',
    category: TechniqueCategory.CREATIVE_CLASSICS,
    description: 'A strong, disconnected style where the top is left significantly longer than the short back and sides.',
    imageUrl: '/images/classic-undercut.jpeg',
    steps: [
        { title: 'Sectioning', instructions: 'Create a horseshoe parting to separate the top from the back and sides.'},
        { title: 'Back and Sides', instructions: 'Cut the back and sides very short using clippers or scissor-over-comb.'},
        { title: 'Top Section', instructions: 'Leave the top section long and disconnected for styling versatility.'},
    ],
  },
  {
    id: 'the-bevel',
    title: 'The Bevel',
    category: TechniqueCategory.CREATIVE_CLASSICS,
    description: 'A technique that creates a soft, turned-under edge, perfect for bobs and mid-length styles.',
    imageUrl: '/images/the-bevel.jpeg',
    steps: [
      { title: 'Sectioning', instructions: 'Work with clean, manageable sections.' },
      { title: 'Cutting Line', instructions: 'Cut a clean perimeter line as your guide.' },
      { title: 'Creating the Bevel', instructions: 'Elevate the sections slightly and use a subtle finger angle to cut a shorter line underneath.' },
      { title: 'Checking the Balance', instructions: 'Ensure the bevel is consistent around the entire head for a perfect finish.' },
    ],
  },
];
