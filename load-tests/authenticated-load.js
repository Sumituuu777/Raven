import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://raven-sdtr.onrender.com';

export const options = {
    vus: 1,
    duration: '30s',
};

export function setup() {

    const payload = JSON.stringify({
        email: __ENV.TEST_EMAIL,
        password: __ENV.TEST_PASSWORD,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(
        `${BASE_URL}/api/auth/login`,
        payload,
        params
    );

    check(res, {
        'setup login successful': (r) =>
            r.status === 200 && r.json('success') === true,
        'setup received JWT': (r) =>
            !!r.json('token'),
    });

    if (res.status !== 200 || !res.json('token')) {
        throw new Error(`Login failed: ${res.body}`);
    }

    return {
        token: res.json('token'),
    };
}

export default function (data) {

    const params = {
        headers: {
            token: data.token,
        },
    };

    const res = http.get(
        `${BASE_URL}/api/messages/users`,
        params
    );

    check(res, {
        'users API returned 200': (r) => r.status === 200,
        'users API successful': (r) => r.json('success') !== false,
    });

    sleep(1);
}