import axiosClient from "@/config/axios";

export const courseprogressService = {
   enrollCourseAPI: async (courseId) => {
      return await axiosClient.post('/course-progress/enroll', { courseId }, { withCredentials: true });
   },
   getAllCourseProgressAPI: async (page, limit) => {
      return await axiosClient.get('/course-progress', {
         params: { page, limit },
      });
   },
   updateProgress: async (progressId, progressPercent) => {
      return await axiosClient.put(`/course-progress/${progressId}/progress`, {
         progressPercent,
      });
   },
};