import { useState } from 'react';
import { Folder, Plus, Tag } from 'lucide-react';

interface CategoryListProps {
    categories: string[];
    cards: any[]; // Used to show count
    onAddCategory: (category: string) => void;
}

export function CategoryList({ categories, cards, onAddCategory }: CategoryListProps) {
    const [newCategory, setNewCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategory.trim()) {
            onAddCategory(newCategory.trim());
            setNewCategory('');
        }
    };

    const getCount = (cat: string) => cards.filter(c => c.category === cat).length;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Categories</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((cat) => (
                    <div
                        key={cat}
                        className="group p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/5 hover:border-indigo-500/30 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                                <Folder className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold text-white opacity-80 group-hover:opacity-100">
                                {getCount(cat)}
                            </span>
                        </div>
                        <h3 className="text-lg font-medium text-slate-200">{cat}</h3>
                        <p className="text-sm text-slate-500 mt-1">Active tasks</p>
                    </div>
                ))}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center p-6 rounded-2xl border-2 border-dashed border-white/10 hover:border-indigo-500/30 hover:bg-slate-900/30 transition-all text-center"
                >
                    <div className="mx-auto p-3 rounded-xl bg-white/5 text-slate-400 mb-4">
                        <Tag className="w-6 h-6" />
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={e => setNewCategory(e.target.value)}
                            placeholder="New Category..."
                            className="flex-1 bg-transparent border-b border-white/10 focus:border-indigo-500 focus:outline-none px-2 py-1 text-sm transition-colors text-center"
                        />
                        <button
                            type="submit"
                            disabled={!newCategory.trim()}
                            className="text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
