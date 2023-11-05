import { MainNav } from '@/components/main-nav';
import { ProfileForm } from '@/components/profile-form';
import { Search } from '@/components/search';
import { Separator } from '@/components/ui/separator';
import { UserNav } from '@/components/user-nav';
import React from 'react';

function Profile() {
  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>

      <div className="hidden space-y-6 p-10 pb-16 md:block">
        {/* <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div> */}
        {/* <Separator className="my-6" /> */}
        {/* <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div> */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              This is how others will see you on the site.
            </p>
          </div>
          <Separator />
          <div className="max-w-[600px] w-full justify-center items-center">
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
