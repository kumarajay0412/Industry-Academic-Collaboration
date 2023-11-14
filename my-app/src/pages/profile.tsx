import Header from '@/components/Header';
import { MainNav } from '@/components/main-nav';
import { ProfileForm } from '@/components/profile-form';
import { Search } from '@/components/search';
import { Separator } from '@/components/ui/separator';
import { UserNav } from '@/components/user-nav';
import React from 'react';

function Profile() {
  return (
    <div>
      <Header />

      <div className=" space-y-6 p-10 pb-16 md:block">
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
