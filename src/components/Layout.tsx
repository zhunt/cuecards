import { Link, useLocation } from 'react-router-dom';
import { Layers, List, PlusCircle, Settings } from 'lucide-react';
import clsx from 'clsx';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const location = useLocation();

    const navItems = [
        { label: 'Cue Card', path: '/', icon: Layers },
        { label: 'All Tasks', path: '/tasks', icon: List },
        { label: 'Categories', path: '/categories', icon: Settings },
        { label: 'New Card', path: '/new', icon: PlusCircle },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
            <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-white/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0 font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                            CueCards
                        </div>
                        <div className="flex gap-1 sm:gap-4">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={clsx(
                                            'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                                            isActive
                                                ? 'bg-white/10 text-white shadow-sm shadow-indigo-500/20'
                                                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                        )}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        <span className="hidden sm:block">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
