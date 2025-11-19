
export enum TechniqueCategory {
  FUNDAMENTALS = 'Fundamentals',
  PRECISIONS = 'Precisions',
  TRANSIENTS = 'Transients',
  MENS = 'Mens',
  CREATIVE_CLASSICS = 'Creative Classics',
}

export interface TrainingStep {
  title: string;
  instructions: string;
}

export interface Technique {
  id: string;
  title: string;
  category: TechniqueCategory;
  description: string;
  steps: TrainingStep[];
  imageUrl: string;
}

// Admin & Progress Types
export interface CompletedTechnique {
  techniqueId: string;
  completedAt: number; // timestamp
  stepTimings: number[]; // duration in ms for each step
}

export interface User {
  id: string;
  name: string;
  applicationNumber: string;
  joinedAt: number;
  completedTechniques: CompletedTechnique[];
}
