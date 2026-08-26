import axiosClient from "@/config/axios";

export const courseService = {
  createCourse: async (courseData) => {
    const payload = {
      ...courseData,
      imageUrl: courseData.imageUrl || ""
    };
    return await axiosClient.post('/courses', payload);
  },
  getAllCourses: async (page, limit) => {
    return await axiosClient.get('/courses', {
      params: { page, limit },
    });
  },
};