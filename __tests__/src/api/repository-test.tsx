import React, {FC, PropsWithChildren} from 'react';
import {renderHook} from '@testing-library/react-hooks';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useGetStoresList} from '../../../src/api/repository';
import {GetStoresList} from '../../../src/api/data-source';

jest.mock('../../../src/api/data-source', () => ({
  GetStoresList: jest.fn(),
}));

describe('useGetStoresList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();

    (GetStoresList as jest.Mock).mockImplementation(() =>
      Promise.resolve(['store1', 'store2']),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch and return the stores list', async () => {
    const wrapper: FC<PropsWithChildren> = ({children}) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const {result, waitFor} = renderHook(() => useGetStoresList(), {wrapper});

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => result.current.isSuccess);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(['store1', 'store2']);
  });
});
