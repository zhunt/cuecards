import { AppData } from '../types';

export const api = {
    async getData(): Promise<AppData> {
        const res = await fetch('/api/cards');
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
    },

    async saveData(data: AppData): Promise<void> {
        const res = await fetch('/api/cards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to save data');
    },
};
