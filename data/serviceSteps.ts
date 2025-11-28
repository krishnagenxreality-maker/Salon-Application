
import { TrainingStep } from '../types';

export const DEFAULT_STEPS: TrainingStep[] = [
    { title: 'Preparation', instructions: 'Get ready with your equipments.' },
    { title: 'Customer requirements', instructions: 'Confirm the desired result and assess hair condition.' },
    { title: 'Service Execution', instructions: 'Perform the primary service.' },
    { title: 'Finish', instructions: 'Finalize the look and check client satisfaction.' },
];

export const SERVICE_STEP_MAPPING: Record<string, TrainingStep[]> = {
    // Women's Cut
    "Cut & Blow Dry": [
        { title: 'Preparation', instructions: 'Get ready with your equipments.' },
        { title: 'Client Prep', instructions: 'Gown the client and ensure they are comfortable.' },
        { title: 'Customer requirements', instructions: 'Discuss length, layers, and desired finish.' },
        { title: 'Wash & Condition', instructions: 'Shampoo and condition at the basin.' },
        { title: 'Sectioning', instructions: 'Create the 4-point sectioning pattern.' },
        { title: 'The Cut', instructions: 'Execute the cut following the guideline.' },
        { title: 'Blow Dry', instructions: 'Apply heat protection and blow dry to shape.' },
        { title: 'Texturizing', instructions: 'Soften weight lines and add texture on dry hair.' },
        { title: 'Finish', instructions: 'Apply finishing product and show the client the back.' }
    ],
    "Cut Only": [
        { title: 'Preparation', instructions: 'Get ready with your equipments.' },
        { title: 'Client Prep', instructions: 'Gown the client.' },
        { title: 'Customer requirements', instructions: 'Confirm length to be removed.' },
        { title: 'Dampen Hair', instructions: 'Spray hair down with water spray.' },
        { title: 'The Cut', instructions: 'Perform the precision cut.' },
        { title: 'Rough Dry', instructions: 'Quick blast dry to check the perimeter.' },
        { title: 'Refinement', instructions: 'Cross-check the cut.' }
    ],

    // Men's Cut
    "Regular": [
        { title: 'Preparation', instructions: 'Get ready with your equipments.' },
        { title: 'Customer requirements', instructions: 'Discuss grade lengths and styling.' },
        { title: 'Clipper Work', instructions: 'Perform back and sides work.' },
        { title: 'Scissor Work', instructions: 'Cut and blend the top section.' },
        { title: 'Edges & Neckline', instructions: 'Clean up the perimeter and neckline.' },
        { title: 'Wash/Rinse', instructions: 'Rinse off loose hairs.' },
        { title: 'Styling', instructions: 'Apply product and style.' }
    ],
    "Stylist-Level Pricing Tiers": [
        { title: 'Preparation', instructions: 'Get ready with your equipments.' },
        { title: 'Customer requirements', instructions: 'Detailed assessment of head shape and hair growth.' },
        { title: 'Precision Cutting', instructions: 'Execute advanced barbering techniques.' },
        { title: 'Detailing', instructions: 'Refine fade and hairline.' },
        { title: 'Luxury Rinse', instructions: 'Wash and condition.' },
        { title: 'Styling & Advice', instructions: 'Style and recommend home care products.' }
    ],

    // Specialty
    "Kids’ Haircut": [
        { title: 'Preparation', instructions: 'Get ready with your equipments.' },
        { title: 'Welcome', instructions: 'Ensure the child is comfortable and cape is secure.' },
        { title: 'Customer requirements', instructions: 'Confirm style with guardian.' },
        { title: 'Dampen/Prep', instructions: 'Spray hair down gently.' },
        { title: 'The Cut', instructions: 'Perform the cut efficiently.' },
        { title: 'Quick Dry', instructions: 'Dry hair off to remove loose hairs.' }
    ],
    "Fringe Trims": [
        { title: 'Preparation', instructions: 'Get ready with your equipments.' },
        { title: 'Customer requirements', instructions: 'Determine length and style of fringe.' },
        { title: 'Sectioning', instructions: 'Isolate the triangle section.' },
        { title: 'The Cut', instructions: 'Cut fringe to desired length.' },
        { title: 'Refinement', instructions: 'Point cut for softness.' }
    ],
    "Restyling": [
        { title: 'Preparation', instructions: 'Get ready with your equipments.' },
        { title: 'Customer requirements', instructions: 'Discuss the significant change and expectations.' },
        { title: 'Structural Sectioning', instructions: 'Section for the new shape.' },
        { title: 'Removal of Length', instructions: 'Establish new length guidelines.' },
        { title: 'Internal Layering', instructions: 'Create the internal shape.' },
        { title: 'Blow Dry & Refine', instructions: 'Dry and cross-check continuously.' },
        { title: 'Final Polish', instructions: 'Detailed styling and product application.' }
    ],

    // Finish Styling
    "Blow-Dry": [
        { title: 'Preparation', instructions: 'Get ready with your equipments.' },
        { title: 'Wash', instructions: 'Cleanse hair thoroughly.' },
        { title: 'Product Application', instructions: 'Apply volume or smoothing products.' },
        { title: 'Sectioning', instructions: 'Section for control.' },
        { title: 'Blow Dry', instructions: 'Round brush or paddle brush work.' },
        { title: 'Finish', instructions: 'Spray and shine.' }
    ],
    "Blowout": [
        { title: 'Preparation', instructions: 'Get ready with your equipments.' },
        { title: 'Wash', instructions: 'Double cleanse and condition.' },
        { title: 'Volume Prep', instructions: 'Apply mousse or root lift.' },
        { title: 'The Blowout', instructions: 'Create maximum volume and bounce.' },
        { title: 'Setting', instructions: 'Pin curl if necessary to cool.' },
        { title: 'Dress Out', instructions: 'Brush out and spray.' }
    ],
    "Updos and Occasion Styling": [
        { title: 'Preparation', instructions: 'Get ready with your equipments.' },
        { title: 'Customer requirements', instructions: 'Review inspiration photos.' },
        { title: 'Prep', instructions: 'Texturize hair with heat or product.' },
        { title: 'Structure', instructions: 'Create the foundation (ponytails/anchors).' },
        { title: 'Pinning', instructions: 'Place and secure the hair.' },
        { title: 'Final Spray', instructions: 'Secure with strong hold spray.' }
    ]
};
