export interface RegisterFormData {
  name: string;
  company: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface UserData {
  name: string;
  company: string;
  email: string;
  createdAt: number;
  lastLoginAt: number;
  role: 'user' | 'admin';
  settings: {
    subscriptionTier: 'free' | 'pro' | 'enterprise';
  };
}