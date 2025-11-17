
export interface TechniqueStep {
  stepNumber: number;
  title: string;
  instruction: string;
}

export interface Technique {
  id: string;
  name: string;
  category: Category;
  description: string;
  steps: TechniqueStep[];
}

export enum Category {
  FUNDAMENTALS = "Fundamentals",
  PRECISION = "Precision",
  TRANSIENTS = "Transients",
  MENS = "Mens",
  CREATIVE_CLASSICS = "Creative Classics"
}

export enum Screen {
  HOME,
  OVERVIEW,
  TRAINING,
  COMPLETION
}
