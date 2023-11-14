import { MainNav } from '@/components/main-nav';
import { Search } from '@/components/search';
import { UserNav } from '@/components/user-nav';
import React from 'react';

function Header() {
  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
