import { UserButton } from '@/features/auth/components/user-button';
import { WorkspaceSwitcher } from './workspace-switcher';
import { SidebarButton } from './sidebar-button';
import { Bell, Home, MessageSquare, MoreHorizontal } from 'lucide-react';

export const Sidebar = () => {
    return (
        <aside className="h-full w-[70px] flex flex-col items-center bg-slacksecondary gap-y-4 pt-[9px] pb-4">
            <WorkspaceSwitcher />
            <SidebarButton icon={Home} label="Home" isActive />
            <SidebarButton icon={MessageSquare} label="DMs" />
            <SidebarButton icon={Bell} label="Activity" />
            <SidebarButton icon={MoreHorizontal} label="More" />
            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
                <UserButton />
            </div>
        </aside>
    );
};
