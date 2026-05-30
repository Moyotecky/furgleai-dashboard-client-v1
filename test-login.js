const axios = require('axios');
const apiClient = axios.create({ baseURL: 'http://localhost:4000' });

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const isAuthRoute = originalRequest?.url?.includes('/api/auth/login');
    
    if (status === 401 && !originalRequest._retry && !isAuthRoute) {
      console.log('Intercepted 401 on non-auth route');
    }
    return Promise.reject(error.response ? error.response.data : error);
  }
);

async function test() {
  try {
    const res = await apiClient.post('/api/auth/login', {email: "fake@test.com", password: "fake"});
    console.log("Success");
  } catch (err) {
    console.error("Login failed with:", err.error ? err.error.code : err.code);
  }
}
test();
