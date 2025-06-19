import React, { useState } from 'react';
import { User, Settings, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { usePage, Link } from '@inertiajs/react';

interface UserData {
  name: string;
  email: string;
  avatar?: string;
}

export default function UserButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = usePage<{ auth: { user: UserData } }>().props;
  const user = auth.user;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>

        <span className="hidden md:inline font-medium">{user.name}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="px-4 py-3 border-b dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>

          <div className="py-1">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <User className="mr-3 h-4 w-4" />
              Profile
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </a>
          </div>

          <div className="py-1 border-t dark:border-gray-700">
            <Link
              href={route('logout')}
              method="post"
              as="button"
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
