import axios from 'axios';
import queryString from 'query-string';
import { FarmerInterface, FarmerGetQueryInterface } from 'interfaces/farmer';
import { GetQueryInterface } from '../../interfaces';

export const getFarmers = async (query?: FarmerGetQueryInterface) => {
  const response = await axios.get(`/api/farmers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFarmer = async (farmer: FarmerInterface) => {
  const response = await axios.post('/api/farmers', farmer);
  return response.data;
};

export const updateFarmerById = async (id: string, farmer: FarmerInterface) => {
  const response = await axios.put(`/api/farmers/${id}`, farmer);
  return response.data;
};

export const getFarmerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/farmers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFarmerById = async (id: string) => {
  const response = await axios.delete(`/api/farmers/${id}`);
  return response.data;
};
