import React, { type ReactNode, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface LayoutProps {
    sidebarContent: ReactNode;
    navbar: ReactNode;
    statusbar: ReactNode;
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
    sidebarContent,
    navbar,
    statusbar,
    children,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className='h-screen w-screen overflow-hidden bg-(--bg-main) text-(--text-primary)'>
            <div className='hidden md:grid md:grid-rows-[50px_1fr_25px] md:grid-cols-[50px_1fr] h-screen w-screen'>
                <div className='col-span-2 border-b border-(--border-color) z-10'>
                    {navbar}
                </div>
                <div className='border-r border-(--border-color) overflow-hidden'>
                    {sidebarContent}
                </div>
                <div className='overflow-hidden bg-(--bg-editor)'>
                    {children}
                </div>
                <div className='col-span-2 border-t border-(--border-color) bg-(--bg-status-bar) z-10'>
                    {statusbar}
                </div>
            </div>
            <div className='md:hidden flex flex-col h-screen w-screen'>
                <div className='border-b border-(--border-color) z-30 bg-(--bg-title-bar)'>
                    <div className='flex items-center'>
                        <button
                            onClick={() => setIsMobileMenuOpen((v) => !v)}
                            className='p-2.5 border-r border-(--border-color) hover:bg-(--bg-activity-bar)'
                        >
                            <Menu size={20} />
                        </button>
                        <div className='flex-1'>{navbar}</div>
                    </div>
                </div>

                <div
                    className={`fixed inset-0 z-40 transition-opacity duration-300 ${
                        isMobileMenuOpen
                            ? 'opacity-100 pointer-events-auto'
                            : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <div
                        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div
                        className={`absolute left-0 top-0 bottom-0 w-64 bg-(--bg-sidebar) border-r border-(--border-color) shadow-2xl transform transition-transform duration-300 ease-out ${
                            isMobileMenuOpen
                                ? 'translate-x-0'
                                : '-translate-x-full'
                        }`}
                    >
                        <div className='flex items-center justify-between p-3 border-b border-(--border-color) bg-(--bg-activity-bar)'>
                            <span className='font-semibold'>Menu</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className='p-1.5 rounded-lg hover:bg-(--bg-panel)'
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className='animate-slide-in'>{sidebarContent}</div>
                    </div>
                </div>

                <div className='flex-1 overflow-hidden bg-(--bg-editor)'>
                    {children}
                </div>

                <div className='border-t border-(--border-color) bg-(--bg-status-bar) z-10'>
                    {statusbar}
                </div>
            </div>
        </div>
    );
};

export default Layout;
