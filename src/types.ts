export interface Card {
    id: string;
    description: string;
    category: string;
    lastDone: string | null; // ISO Date string
    repeatFrequency: number; // Days until next appearance (approx)
    doesNotRepeat?: boolean; // If true, the card does not repeat after being done
    isArchived?: boolean;    // If true, the card is hidden from active sessions
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
