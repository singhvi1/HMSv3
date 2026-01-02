import api from '../utils/api';

export const announcementService = {
  createAnnouncement: (data) => api.post('/home/announcements', data),

  getAllAnnouncements: () => api.get('/home/announcements'),

  getAnnouncementById: (id) => api.get(`/home/announcements/${id}`),

  updateAnnouncement: (data, id) => api.patch(`/home/announcements/${id}`, data),

  deleteAnnouncement: (id) => api.delete(`/home/announcements/${id}`),
};

export const studentService = {
  createUserStudent: (data) => api.post("/students/create", data),

  createStudent: (data) => api.post(`/students`, data),

  getAllStudents: (params) => api.get('/students/getall', { params }),

  getStudentById: (id) => api.get(`/students/profile/${id}`),

  updateStudent: (userId, data) => api.patch(`/students/${userId}`, data),
  deleteStudent: (userId) => api.delete(`/students/${userId}`),
};


export const roomService = {
  createRoom: (data) => api.post(`/admin/rooms`, data),

  getAllRooms: () => api.get('/admin/rooms'),

  toggleRoomStatus: (id) => api.patch(`/admin/rooms/${id}/toggle`),

  getRoomById: (id) => api.get(`/admin/rooms/${id}`)

};

export const issueService = {
  getAllIssues: (params) => api.get('/issues', { params }),
  getIssue: (id) => api.get(`/issues/${id}`),
  updateIssueStatus: (id, status) => api.patch(`/issues/${id}/status`, { status }),
  deleteIssue: (id) => api.delete(`/issues/${id}`),
};

export const leaveService = {
  getAllLeaves: () => api.get('/leave'),
  updateLeaveStatus: (id, status) => api.patch(`/leave/${id}/status`, { status }),
};

export const paymentService = {
  getAllPayments: () => api.get('/payments'),
  createPayment: (data) => api.post('/payments/create', data),
};

export const dashboardService = {
  getDashboardStats: () => api.get('/admin/dashboard'),
};

export const authService = {
  loginUser: (email, password) => api.post('/login', { email, password }),
  logoutUser: () => api.post('/logout'),
}

export const userService = {
  createUser: (data) => api.post(`/users`, data)
}
//future : 
export const hostelService = {
  create: (data) => api.post("/admin/hostel", data),

  getAll: () => api.get("/admin/hostel"),

  getById: (id) => api.get(`/admin/hostel/${id}`),

  update: (id, data) => api.patch(`/admin/hostel/${id}`, data),

  toggleStatus: (id) =>
    api.patch(`/admin/hostel/${id}/toggle-status`),

  delete: (id) => api.delete(`/admin/hostel/${id}`)
};
