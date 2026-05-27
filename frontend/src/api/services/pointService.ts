import api from '../axiosConfig';
import type { Point, PointDetail } from '../types/index.ts';

const pointService = {
   getAll: () => api.get<Point[]>('/v1/points'),
   getById: (id: string) => api.get<PointDetail>(`/v1/points/${id}`),
};

export default pointService;