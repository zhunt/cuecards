export interface Card {
    id: string;
    description: string;
    category: string;
    lastDone: string | null; // ISO Date string
    repeatFrequency: number; // Days until next appearance (approx)
}

export interface AppData {
    cards: Card[];
    categories: string[];
}
