import { User, CompletedTechnique, CustomerSession } from '../types';

// SMART CONFIGURATION:
// This looks for an environment variable 'VITE_API_URL'.
// If found (on Vercel), it uses that.
// If not found (Localhost), it defaults to 'http://localhost:3001/api'.

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api';

console.log("Using Backend URL:", API_URL); // Debug log to check connection

export const api = {
    async login(id: string, password: string, role: 'admin' | 'candidate') {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, password, role }),
            });
            return await response.json();
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
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