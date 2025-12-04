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
  techniqueTitle: string;
  completedAt: number; // timestamp
  stepTimings: number[]; // duration in ms for each step
  totalTime: number;
}

export interface CustomerSession {
    id: string;
    customerDetails: CustomerDetails;
    serviceName: string;
    subService: string;
    customerRequest: string; // From consultation
    stepTimings: number[];
    images: SessionImage[];
    rating: number;
    timestamp: number;
}

export interface User {
  id: string;
  name: string;
  applicationNumber: string; // Used as Candidate ID
  joinedAt: number;
  completedTechniques: CompletedTechnique[];
  customerSessions: CustomerSession[];
}

export interface CustomerDetails {
    name: string;
    date: string;
    time: string;
    duration: string;
    isMember: boolean;
    memberId?: string;
}

export interface SessionImage {
    stepIndex: number;
    stepTitle: string;
    imageUrl: string;
    timestamp: number;
}

export type Page = 
    | 'ROLE_SELECTION' 
    | 'HOME' 
    | 'TECHNIQUE' 
    | 'TRAINING' 
    | 'COMPLETED' 
    | 'LOGIN' 
    | 'CREATE_ID' 
    | 'FORGOT_PASSWORD' 
    | 'ADMIN' 
    | 'ADMIN_CANDIDATE_DETAILS'
    | 'ADMIN_SESSION_DETAILS'
    | 'WELCOME' 
    | 'MODE_SELECTION' 
    | 'SERVICE_SELECTION' 
    | 'CUSTOMER_WELCOME' 
    | 'CUSTOMER_DETAILS' 
    | 'CUSTOMER_SERVICE_MENU' 
    | 'HAIRCUTS_SELECTION' 
    | 'LIVE_SESSION' 
    | 'LIVE_SESSION_COMPLETED';

export type UserRole = 'admin' | 'candidate' | null;