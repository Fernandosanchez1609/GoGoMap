import api from '../axiosConfig';
import type { Point } from '../types/index.ts';

const pointService = {
   getAll: () => api.get<Point[]>('/points')
};

export default pointService;