const axios = require('axios');
async function test() {
  const login = await axios.post('http://localhost:4000/api/auth/login', {email: "test456@test.com", password: "Password123!"});
  const token = login.data.data.authentication.accessToken;
  console.log("Got token:", token);
  try {
    const res = await axios.get('http://localhost:4000/api/analytics/overview', {
      headers: { Authorization: "Bearer " + token }
    });
    console.log("Success:", res.data);
  } catch (e) {
    console.error("Error from overview:", e.response ? e.response.data : e.message);
  }
}
test();
