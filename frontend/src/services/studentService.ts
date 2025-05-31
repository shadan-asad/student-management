import api from './api';
import type { Student, PaginatedResponse } from '../types';

export const studentService = {
  async getAll(page = 1, limit = 10): Promise<PaginatedResponse<Student>> {
    const response = await api.get(`/students?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getById(id: string): Promise<Student> {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  async create(student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> {
    const response = await api.post('/students', student);
    return response.data;
  },

  async update(id: string, student: Partial<Student>): Promise<Student> {
    const response = await api.put(`/students/${id}`, student);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/students/${id}`);
  }
}; 