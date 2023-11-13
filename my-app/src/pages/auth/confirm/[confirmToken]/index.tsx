import { Button } from '@/components/ui/button';
import { useConfirmEmailMutation } from '@/store/auth';
import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';

function index() {
  const [confirmEmail, { isLoading, isError }] = useConfirmEmailMutation();

  const handleConfirmEmail = () => {
    const confirmToken = window.location.href.split('confirm/')[1];
    confirmEmail(confirmToken);
  };

  useEffect(() => {
    handleConfirmEmail();
  }, []);

  return (
    <>
      <div className="h-full w-full ">
        <div className="relative flex h-full  w-full  flex-col items-center md:flex-row">
          <div className="relative flex h-full  w-full justify-center lg:w-[50%] overflow-scroll  no-scrollbar">
            {isError ? (
              <div className="flex justify-center items-center gap-4   flex-col w-full">
                <div>Authentication failed pls try again </div>
                <Button
                  className="w-fit"
                  variant="secondary"
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  Go Back To Login
                </Button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-4   flex-col w-full">
                {!isLoading && (
                  <CircularProgress size={36} style={{ color: '#333333' }} />
                )}
                <div>Authenticating</div>
              </div>
            )}
          </div>
          <div className="relative  h-full  w-full justify-center lg:w-[50%] lg:h-screen hidden lg:flex">
            <img
              src="/assets/banner.jpg"
              alt="login"
              className=" object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
