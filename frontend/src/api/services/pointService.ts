import api from '../axiosConfig';
import type { Point, PointDetail } from '../types/index.ts';

const pointService = {
   getAll: () => api.get<Point[]>('/points'),
   getById: (id: string) => api.get<PointDetail>(`/points/${id}`),
};

export default pointService;