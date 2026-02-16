import { useState, useEffect, useCallback } from 'react';
import { AppData, Card } from '../types';
import { api } from '../services/api';

export function useCards() {
    const [data, setData] = useState<AppData>({ cards: [], categories: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const appData = await api.getData();
            setData(appData);
            setError(null);
        } catch (err) {
            setError('Failed to load cards');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const saveToBackend = async (newData: AppData) => {
        setData(newData);
        try {
            await api.saveData(newData);
        } catch (err) {
            setError('Failed to save changes');
            // Revert or handle error appropriately
            fetchData();
        }
    };

    const addCard = async (card: Card) => {
        const newData = { ...data, cards: [...data.cards, card] };
        await saveToBackend(newData);
    };

    const updateCard = async (updatedCard: Card) => {
        const newData = {
            ...data,
            cards: data.cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)),
        };
        await saveToBackend(newData);
    };

    const deleteCard = async (id: string) => {
        const newData = {
            ...data,
            cards: data.cards.filter((c) => c.id !== id),
        };
        await saveToBackend(newData);
    };

    const markDone = async (id: string) => {
        const card = data.cards.find(c => c.id === id);
        if (card) {
            const updatedCard = { ...card, lastDone: new Date().toISOString() };
            await updateCard(updatedCard);
        }
    }

    const addCategory = async (category: string) => {
        if (!data.categories.includes(category)) {
            const newData = { ...data, categories: [...data.categories, category] };
            await saveToBackend(newData);
        }
    }

    return {
        data,
        loading,
        error,
        addCard,
        updateCard,
        deleteCard,
        markDone,
        addCategory,
        refresh: fetchData
    };
}
