import { User } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Sarah Sterling',
    applicationNumber: 'TG-2024-8821',
    joinedAt: 1704067200000, // Jan 1, 2024
    completedTechniques: [
      {
        techniqueId: 'one-length',
        techniqueTitle: 'One Length',
        completedAt: 1704555000000,
        stepTimings: [125000, 140000, 110000, 95000],
        totalTime: 470000
      }
    ],
    customerSessions: []
  }
];