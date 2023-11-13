import { Alert, Portal, Snackbar } from '@mui/material';
import { AppProps } from 'next/app';
import { useCallback, useEffect, useState } from 'react';
import store, { useSelector, useDispatch } from '../store/store';
import { RouteGuard } from './RouteGuard';
import { setStatus } from '@/store/toaster/slice';

export default function AppContent() {
  const dispatch = useDispatch();
  const toasterStatus = useSelector((state) => state.toaster);
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = useCallback(() => {
    setOpen(false);
    dispatch(setStatus({ message: '', type: undefined, timeout: 0 }));
  }, [dispatch]);

  useEffect(() => {
    if (toasterStatus?.status?.message !== '') {
      setOpen(true);
    }
  }, [toasterStatus]);

  console.log(toasterStatus);
  return (
    <RouteGuard>
      <Portal>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={toasterStatus?.status?.timeout}
          onClose={handleCancel}
        >
          <Alert severity={toasterStatus?.status?.type}>
            {toasterStatus?.status?.message}
          </Alert>
        </Snackbar>
      </Portal>
    </RouteGuard>
  );
}
