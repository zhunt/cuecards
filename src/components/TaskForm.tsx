import { useState } from 'react';
import { Card } from '../types';
import { X, Save } from 'lucide-react';

interface TaskFormProps {
    initialData?: Card;
    categories: string[];
    onSave: (card: Omit<Card, 'id' | 'lastDone'> & { id?: string }) => void;
    onCancel: () => void;
}

export function TaskForm({ initialData, categories, onSave, onCancel }: TaskFormProps) {
    const [description, setDescription] = useState(initialData?.description || '');
    const [category, setCategory] = useState(initialData?.category || categories[0] || 'General');
    const [repeatFrequency, setRepeatFrequency] = useState(initialData?.repeatFrequency || 1);
    const [newCategory, setNewCategory] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: initialData?.id,
            description,
            category: isAddingCategory ? newCategory : category,
            repeatFrequency,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-800/50">
                    <h2 className="text-xl font-bold text-white">
                        {initialData ? 'Edit Cue Card' : 'New Cue Card'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="p-2 -mr-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none transition-all resize-none h-32"
                            placeholder="What task needs to be done?"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Category
                            </label>
                            {!isAddingCategory ? (
                                <div className="flex gap-2">
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="flex-1 px-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none transition-all"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingCategory(true)}
                                        className="px-3 py-2 text-sm font-medium text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors border border-indigo-400/20"
                                    >
                                        New
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        className="flex-1 px-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl focus:border-indigo-500 focus:outline-none"
                                        placeholder="New Category Name"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingCategory(false)}
                                        className="px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Repeat Frequency (Days)
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={repeatFrequency}
                                onChange={(e) => setRepeatFrequency(parseInt(e.target.value) || 1)}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-5 py-2.5 rounded-xl text-slate-300 font-medium hover:bg-white/5 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
                        >
                            <Save className="w-4 h-4" />
                            Save Card
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
