import { storage } from './storage';
import { User } from '../types';

export const auth = {
  isAuthenticated: (): boolean => {
    return storage.getUser() !== null;
  },

  isAdmin: (): boolean => {
    const user = storage.getUser();
    return user?.username === 'admin';
  },

  getCurrentUser: (): User | null => {
    return storage.getUser();
  },

  login: (username: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username.trim() && password.trim()) {
          const user: User = { username, role: 'user' };
          storage.setUser(user);
          resolve(user);
        } else {
          reject(new Error('Vui lòng nhập đầy đủ thông tin!'));
        }
      }, 1000);
    });
  },

  logout: (): void => {
    storage.removeUser();
  },
};

