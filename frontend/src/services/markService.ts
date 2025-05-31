import api from './api';
import type { Mark, PaginatedResponse } from '../types';

export const markService = {
  async getAll(page = 1, limit = 10): Promise<PaginatedResponse<Mark>> {
    const response = await api.get(`/marks?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getByStudentId(studentId: string, page = 1, limit = 10): Promise<PaginatedResponse<Mark>> {
    const response = await api.get(`/marks/student/${studentId}?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getById(id: string): Promise<Mark> {
    const response = await api.get(`/marks/${id}`);
    return response.data;
  },

  async create(mark: Omit<Mark, 'id' | 'createdAt' | 'updatedAt'>): Promise<Mark> {
    const response = await api.post('/marks', mark);
    return response.data;
  },

  async update(id: string, mark: Partial<Mark>): Promise<Mark> {
    const response = await api.put(`/marks/${id}`, mark);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/marks/${id}`);
  }
}; 