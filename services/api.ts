import { User, CompletedTechnique, CustomerSession } from '../types';

const API_URL = 'http://localhost:3001/api';

export const api = {
    async login(id: string, password: string, role: 'admin' | 'candidate') {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, password, role }),
        });
        return response.json();
    },

    async register(applicationNumber: string, password: string, role: 'admin' | 'candidate') {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ applicationNumber, password, role }),
        });
        return response.json();
    },

    async resetPassword(id: string, newPassword: string, role: 'admin' | 'candidate') {
        const response = await fetch(`${API_URL}/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, newPassword, role }),
        });
        return response.json();
    },

    async getAllUsers() {
        try {
            const response = await fetch(`${API_URL}/users`);
            if (!response.ok) throw new Error('Failed to fetch users');
            return response.json();
        } catch (error) {
            console.error("API Error:", error);
            return [];
        }
    },

    async getUserById(id: string) {
        try {
            const response = await fetch(`${API_URL}/users/${id}`);
            if (!response.ok) throw new Error('Failed to fetch user');
            return response.json();
        } catch (error) {
            console.error("API Error:", error);
            return undefined;
        }
    },

    async saveCompletedTechnique(userId: string, techniqueData: CompletedTechnique) {
        const response = await fetch(`${API_URL}/training/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, techniqueData }),
        });
        return response.json();
    },

    async saveCustomerSession(userId: string, sessionData: CustomerSession) {
        const response = await fetch(`${API_URL}/session/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, sessionData }),
        });
        return response.json();
    }
};