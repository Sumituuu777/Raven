import http from 'k6/http';

const BASE_URL = 'https://raven-sdtr.onrender.com';

export const options = {
    vus: 1,
    duration: '30s',
};

export default function () {
    http.get(`${BASE_URL}/api/health`);
}