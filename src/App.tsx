import { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CueCard } from './components/CueCard';
import { TaskList } from './components/TaskList';
import { CategoryList } from './components/CategoryList';
import { TaskForm } from './components/TaskForm';
import { useCards } from './hooks/useCards';
import { Card } from './types';
import { Loader2 } from 'lucide-react';

function App() {
    const { data, loading, error, addCard, updateCard, deleteCard, markDone, addCategory } = useCards();
    const [editingCard, setEditingCard] = useState<Card | undefined>(undefined);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const navigate = useNavigate();

    // Logic to select cards based on random order and availability
    // For a real cue card system, we might want a weighted random selection based on 'lastDone'
    // But for now, let's shuffle them or just iterate.



    // We need a stable list for navigation to work with 'Skip'
    const [sessionCards, setSessionCards] = useState<Card[]>([]);

    // Initialize session cards when data loads
    useMemo(() => {
        if (data.cards.length > 0 && sessionCards.length === 0) {
            const activeCards = data.cards.filter(card => !card.isArchived);
            setSessionCards([...activeCards].sort(() => Math.random() - 0.5));
        }
    }, [data.cards, sessionCards.length]);


    const currentCard = sessionCards[currentCardIndex];

    const handleNext = () => {
        setCurrentCardIndex((prev) => (prev + 1) % sessionCards.length);
    };

    const handleDone = async () => {
        if (currentCard) {
            await markDone(currentCard.id);
            handleNext();
        }
    };

    const handleSaveTask = async (task: any) => {
        if (task.id) {
            await updateCard(task as Card);
        } else {
            await addCard({ ...task, id: crypto.randomUUID(), lastDone: null });
        }
        setIsFormOpen(false);
        setEditingCard(undefined);
        // Refresh session if needed or just let the hook handle global state
        // Ideally we update sessionCards too if it's a new card
        if (!task.id) {
            // Force a re-fetch or re-shuffle could happen here
        }
    };

    const handleCardUpdate = async (updatedCard: Card) => {
        setSessionCards(prev => prev.map(c => c.id === updatedCard.id ? updatedCard : c));
        await updateCard(updatedCard);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950 text-indigo-400">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950 text-red-400">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <Layout>
            <Routes>
                <Route
                    path="/"
                    element={
                        currentCard ? (
                            <CueCard
                                card={currentCard}
                                onDone={handleDone}
                                onSkip={handleNext}
                                onEdit={() => {
                                    setEditingCard(currentCard);
                                    setIsFormOpen(true);
                                }}
                                onUpdate={handleCardUpdate}
                            />
                        ) : (
                            <div className="text-center py-20">
                                <h2 className="text-2xl font-bold text-white mb-4">All Cached Up!</h2>
                                <p className="text-slate-400 mb-8">No cards available in this session.</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-3 bg-indigo-600 rounded-xl text-white font-bold hover:bg-indigo-500 transition-colors"
                                >
                                    Start Fresh Session
                                </button>
                            </div>
                        )
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <TaskList
                            cards={data.cards}
                            onEdit={(card) => {
                                setEditingCard(card);
                                setIsFormOpen(true);
                            }}
                            onDelete={deleteCard}
                            onAdd={() => {
                                setEditingCard(undefined);
                                setIsFormOpen(true);
                            }}
                        />
                    }
                />
                <Route
                    path="/categories"
                    element={
                        <CategoryList
                            categories={data.categories}
                            cards={data.cards}
                            onAddCategory={addCategory}
                        />
                    }
                />
                <Route
                    path="/new"
                    element={
                        // Redirect logic or just render form
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <button
                                onClick={() => {
                                    setEditingCard(undefined);
                                    setIsFormOpen(true);
                                }}
                                className="px-8 py-4 bg-indigo-600 rounded-xl text-white font-bold text-xl hover:bg-indigo-500 shadow-xl shadow-indigo-500/20 transition-all active:scale-95"
                            >
                                Create New Card
                            </button>
                        </div>
                    }
                />
            </Routes>

            {isFormOpen && (
                <TaskForm
                    initialData={editingCard}
                    categories={data.categories}
                    onSave={handleSaveTask}
                    onCancel={() => {
                        setIsFormOpen(false);
                        setEditingCard(undefined);
                        if (location.pathname === '/new') {
                            navigate('/');
                        }
                    }}
                />
            )}
        </Layout>
    );
}

export default App;
