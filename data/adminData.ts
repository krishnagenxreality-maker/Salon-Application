
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
        completedAt: 1704555000000,
        stepTimings: [125000, 140000, 110000, 95000],
      },
      {
        techniqueId: 'classic-bob',
        completedAt: 1705160000000,
        stepTimings: [150000, 180000, 165000, 120000],
      }
    ]
  },
  {
    id: 'u2',
    name: 'Michael Chen',
    applicationNumber: 'TG-2024-8845',
    joinedAt: 1704240000000,
    completedTechniques: [
      {
        techniqueId: 'mens-square-graduation',
        completedAt: 1704820000000,
        stepTimings: [180000, 160000, 90000],
      }
    ]
  },
  {
    id: 'u3',
    name: 'Jessica Alverez',
    applicationNumber: 'TG-2024-8902',
    joinedAt: 1705500000000,
    completedTechniques: []
  },
  {
    id: 'u4',
    name: 'David Ross',
    applicationNumber: 'TG-2024-8933',
    joinedAt: 1706100000000,
    completedTechniques: [
        {
            techniqueId: 'one-length',
            completedAt: 1706500000000,
            stepTimings: [110000, 130000, 100000, 90000],
        },
        {
            techniqueId: 'natural-inversion',
            completedAt: 1706800000000,
            stepTimings: [140000, 155000, 130000],
        },
        {
            techniqueId: 'textured-crop',
            completedAt: 1707000000000,
            stepTimings: [200000, 120000, 180000, 100000],
        }
    ]
  }
];
