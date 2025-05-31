import api from './api';
import type { Subject, PaginatedResponse } from '../types';

export const subjectService = {
  async getAll(page = 1, limit = 10): Promise<PaginatedResponse<Subject>> {
    const response = await api.get(`/subjects?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getById(id: string): Promise<Subject> {
    const response = await api.get(`/subjects/${id}`);
    return response.data;
  },

  async create(subject: Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>): Promise<Subject> {
    const response = await api.post('/subjects', subject);
    return response.data;
  },

  async update(id: string, subject: Partial<Subject>): Promise<Subject> {
    const response = await api.put(`/subjects/${id}`, subject);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/subjects/${id}`);
  }
}; 