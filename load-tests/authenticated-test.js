import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = 'https://raven-sdtr.onrender.com';

export const options = {
    vus: 1,
    duration: '10s',
};

export default function () {

    // Login
    const loginPayload = JSON.stringify({
        email: __ENV.TEST_EMAIL,
        password: __ENV.TEST_PASSWORD,
    });

    const loginParams = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const loginRes = http.post(
        `${BASE_URL}/api/auth/login`,
        loginPayload,
        loginParams
    );

    const loginSuccess = loginRes.json('success');
    const token = loginRes.json('token');

    check(loginRes, {
        'login returned 200': (r) => r.status === 200,
        'login successful': () => loginSuccess === true,
        'JWT token received': () => !!token,
    });

    // Don't continue if authentication failed
    if (!token) {
        console.log(`Login failed: ${loginRes.body}`);
        return;
    }

    // Authenticated request
    const apiParams = {
        headers: {
            token: token,
        },
    };

    const usersRes = http.get(
        `${BASE_URL}/api/messages/users`,
        apiParams
    );

    console.log(`Users API status: ${usersRes.status}`);

    check(usersRes, {
        'users API returned 200': (r) => r.status === 200,
        'users API successful': (r) => r.json('success') !== false,
    });
} 

