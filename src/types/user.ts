export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  roles: Role[];
}

export interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
  fullName: string;
  roleIds: number[];
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface Permission {
  id: number;
  name: string;
  action?: string;
  resource?: string;
  description?: string | null;
}

export interface Role {
  id: number;
  name: string;
  description?: string | null;
  permissions?: Permission[];
}