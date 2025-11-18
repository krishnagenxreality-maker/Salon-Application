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