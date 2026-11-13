import api from "../services/api";
import type { User, CreateUserPayload, CreateUserResponse } from "../types/user";

export const getUser = async (
  id: number | string,
  signal?: AbortSignal,
): Promise<User> => {
  const response = await api.get(`api/users/${id}`, { signal });
  return response.data.user;
};

export const createUser = async (
  payload: CreateUserPayload,
): Promise<CreateUserResponse> => {
  const response = await api.post<CreateUserResponse>("/api/users", payload);

  return response.data;
};
