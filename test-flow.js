const axios = require('axios');

// Mock tokenManager
let accessToken = null;
let refreshToken = null;

const tokenManager = {
  getAccessToken: () => accessToken,
  setAccessToken: (t) => { accessToken = t; },
  getRefreshToken: () => refreshToken,
  setRefreshToken: (t) => { refreshToken = t; },
  clearAll: () => { accessToken = null; refreshToken = null; }
};

// Simple apiClient simulation
const apiClient = axios.create({ baseURL: 'http://localhost:4000' });

apiClient.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (!refreshToken) throw new Error('No refresh token');
        const { data } = await axios.post(`http://localhost:4000/api/auth/refresh-token`, { refreshToken });
        const newAccessToken = data.data.authentication.accessToken;
        tokenManager.setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (e) {
        console.error("REFRESH ERROR:", e.message);
        throw e;
      }
    }
    throw error;
  }
);

async function test() {
  try {
    // 1. Login
    const login = await axios.post('http://localhost:4000/api/auth/login', {email: "test456@test.com", password: "Password123!"});
    refreshToken = login.data.data.authentication.refreshToken;
    console.log("Logged in. Refresh token:", refreshToken);

    // 2. Simulate page refresh (access token lost, refresh token kept)
    accessToken = null;

    // 3. Make request
    console.log("Making request to overview without access token...");
    const res = await apiClient.get('/api/analytics/overview');
    console.log("Success:", res.data);
  } catch (e) {
    console.error("FINAL ERROR:", e);
  }
}

test();
