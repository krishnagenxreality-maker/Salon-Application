
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
  videoUrl?: string;
  imageUrl?: string;
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

export type Page = 'ROLE_SELECTION' | 'HOME' | 'TECHNIQUE' | 'TRAINING' | 'COMPLETED' | 'LOGIN' | 'CREATE_ID' | 'FORGOT_PASSWORD' | 'ADMIN' | 'WELCOME' | 'MODE_SELECTION' | 'SERVICE_SELECTION' | 'CUSTOMER_WELCOME' | 'CUSTOMER_DETAILS' | 'CUSTOMER_SERVICE_MENU' | 'HAIRCUTS_SELECTION' | 'LIVE_SESSION' | 'LIVE_SESSION_COMPLETED';

export type UserRole = 'admin' | 'candidate' | null;
