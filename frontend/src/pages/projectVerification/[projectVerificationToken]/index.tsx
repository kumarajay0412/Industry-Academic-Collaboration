import { Button } from '@/components/ui/button';
import {
  useConfirmEmailMutation,
  useProjectVerifyMutation,
} from '@/store/auth';
import { useDispatch } from '@/store/store';
import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { setStatus } from '@/store/toaster/slice';
import { useRouter } from 'next/router';

function Index() {
  const [projectVerify, { isLoading, isError, isSuccess }] =
    useProjectVerifyMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleConfirmEmail = () => {
    const projectVerificationToken = window.location.href.split(
      'projectVerification/'
    )[1];

    try {
      const response = projectVerify({
        verificationToken: projectVerificationToken,
      }).unwrap();
      if (response instanceof Error) {
        dispatch(
          setStatus({
            type: 'error',
            message: 'Request Failed Pls Try Again',
            timeout: 4000,
          })
        );

        router.push('/');
      } else {
        dispatch(
          setStatus({
            type: 'success',
            message: 'project verification Successful ',
            timeout: 4000,
          })
        );
      }
    } catch (err) {
      dispatch(
        setStatus({
          type: 'error',
          message: 'Request Failed Pls Try Again',
          timeout: 4000,
        })
      );
    }
  };

  useEffect(() => {
    handleConfirmEmail();
  }, []);

  return (
    <>
      <div className="h-full w-full ">
        <div className="relative flex h-full  w-full  flex-col items-center md:flex-row">
          <div className="relative flex h-screen  lg:h-full   w-full justify-center lg:w-[50%] overflow-scroll  no-scrollbar">
            <div className="flex justify-center items-center gap-4   flex-col w-full">
              {isLoading && (
                <CircularProgress size={36} style={{ color: '#333333' }} />
              )}
              {isLoading && <div>Authenticating</div>}
              {isSuccess && (
                <div>
                  <div>project verified </div>
                  <Button
                    className="w-fit"
                    variant="secondary"
                    onClick={() => {
                      window.location.href = '/';
                    }}
                  >
                    Go Back To dashboard
                  </Button>
                </div>
              )}
            </div>
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

export default Index;
