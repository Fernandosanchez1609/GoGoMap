import api from '../axiosConfig';
import type { Point, PointDetail } from '../types/index.ts';

const pointService = {
   getAll: () => api.get<Point[]>('/v1/points'),
   getById: (id: string) => api.get<PointDetail>(`/v1/points/${id}`),
   performAction: (id: string, actionType: string) => api.post(`/v1/points/${id}/actions`, { actionType }),
   getActionStatus: (id: string, actionType: string) => api.get<{ hasPerformed: boolean }>(`/v1/points/${id}/actions/status`, { params: { actionType } }),
};

export default pointService;