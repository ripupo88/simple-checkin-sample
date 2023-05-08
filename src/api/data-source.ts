import axios from 'axios';
import qs from 'qs';
import {API_URL} from '../config/config';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const GetStoresList = async () => {
  const resp = await axiosInstance.get('/stores');
  return resp.data;
};

export const CheckOut = async () => {
  const resp = await axiosInstance.post('/stores/reset');
  return resp;
};

export type ChackinProps = {storeId: number; taskId: number};

export const CheckIn = async ({storeId, taskId}: ChackinProps) => {
  const payload = qs.stringify({
    storeId,
    taskId,
  });
  const resp = await axiosInstance.post('/checkin', payload);
  return resp;
};
