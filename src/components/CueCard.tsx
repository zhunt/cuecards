import { motion } from 'framer-motion';
import { Check, SkipForward, Edit2 } from 'lucide-react';
import { Card } from '../types';

interface CueCardProps {
    card: Card;
    onDone: () => void;
    onSkip: () => void;
    onEdit: () => void;
}

export function CueCard({ card, onDone, onSkip, onEdit }: CueCardProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full max-w-xl"
            >
                <div className="relative group perspective-1000">
                    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-black/50 overflow-hidden">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

                        <div className="flex justify-between items-start mb-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                                {card.category}
                            </span>
                            <button
                                onClick={onEdit}
                                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                title="Edit Card"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                        </div>

                        <h2 className="text-2xl sm:text-4xl font-bold leading-tight text-white mb-8">
                            {card.description}
                        </h2>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={onSkip}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/5 text-slate-300 font-medium transition-all active:scale-95"
                            >
                                <SkipForward className="w-5 h-5" />
                                Skip
                            </button>
                            <button
                                onClick={onDone}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
                            >
                                <Check className="w-5 h-5" />
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
