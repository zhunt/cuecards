export interface Card {
    id: string;
    description: string;
    category: string;
    lastDone: string | null; // ISO Date string
    repeatFrequency: number; // Days until next appearance (approx)
    subtasks?: Subtask[];
}

export interface Subtask {
    id: string;
    text: string;
    isCompleted: boolean;
}

export interface AppData {
    cards: Card[];
    categories: string[];
}
