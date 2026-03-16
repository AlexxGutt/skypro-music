import { useEffect } from 'react';
import { useAppDispatch } from '@/app/store/store';
import { setResetFilters } from '@/app/store/features/trackSlice';
import { usePathname } from 'next/navigation';

export const useResetFilters = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(setResetFilters());
  }, [pathname, dispatch]);
};
