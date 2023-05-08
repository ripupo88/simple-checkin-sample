import {useQuery, useMutation} from '@tanstack/react-query';
import {ChackinProps, CheckIn, CheckOut, GetStoresList} from './data-source';

export const useGetStoresList = () => {
  const res = useQuery({
    queryKey: ['stores'],
    queryFn: () => GetStoresList(),
  });

  return res;
};

export const useCheckOut = () => {
  const res = useMutation({
    mutationKey: ['checkout'],
    mutationFn: () => CheckOut(),
  });

  return res;
};

export const useCheckIn = () => {
  const res = useMutation({
    mutationKey: ['checkin'],
    mutationFn: ({storeId, taskId}: ChackinProps) => CheckIn({storeId, taskId}),
  });

  return res;
};
