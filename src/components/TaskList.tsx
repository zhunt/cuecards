import { useState } from 'react';
import { Card } from '../types';
import { Edit2, Trash2, Plus, Calendar, RotateCw } from 'lucide-react';


interface TaskListProps {
    cards: Card[];
    onEdit: (card: Card) => void;
    onDelete: (id: string) => void;
    onAdd: () => void;
}

export function TaskList({ cards, onEdit, onDelete, onAdd }: TaskListProps) {
    const [filter, setFilter] = useState('');

    const filteredCards = cards.filter(c =>
        c.description.toLowerCase().includes(filter.toLowerCase()) ||
        c.category.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-white/5 sticky top-20 z-10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">All Tasks</h2>
                <div className="flex gap-4 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full sm:w-64 px-4 py-2 rounded-lg bg-slate-950 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none transition-all"
                    />
                    <button
                        onClick={onAdd}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors whitespace-nowrap shadow-lg shadow-indigo-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add Task</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {filteredCards.map((card) => (
                    <div
                        key={card.id}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-900/30 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-800/50 transition-all duration-200"
                    >
                        <div className="flex-1 min-w-0 mr-4">
                            <div className="flex items-center flex-wrap gap-2 mb-2">
                                <span className="text-xs font-medium text-indigo-300 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                                    {card.category}
                                </span>
                                <span title="Repeat Frequency" className="flex items-center gap-1 text-xs text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-full border border-white/5">
                                    <RotateCw className="w-3 h-3" />
                                    Every {card.repeatFrequency} days
                                </span>
                                {card.lastDone && (
                                    <span title="Last Done" className="flex items-center gap-1 text-xs text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-full border border-white/5">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(card.lastDone).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                            <p className="text-slate-200 leading-relaxed font-medium">{card.description}</p>
                        </div>
                        <div className="flex gap-2 mt-3 sm:mt-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-200">
                            <button
                                onClick={() => onEdit(card)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 sm:gap-0 p-2 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 transition-colors border border-white/5 sm:border-transparent"
                                title="Edit"
                            >
                                <Edit2 className="w-4 h-4" />
                                <span className="sm:hidden text-xs">Edit</span>
                            </button>
                            <button
                                onClick={() => onDelete(card.id)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 sm:gap-0 p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors border border-white/5 sm:border-transparent"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="sm:hidden text-xs">Delete</span>
                            </button>
                        </div>
                    </div>
                ))}

                {filteredCards.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500 border-2 border-dashed border-white/5 rounded-2xl">
                        <p>No tasks found matching your search.</p>
                        <button onClick={() => setFilter('')} className="mt-4 text-indigo-400 hover:underline">Clear Filter</button>
                    </div>
                )}
            </div>
        </div>
    );
}
