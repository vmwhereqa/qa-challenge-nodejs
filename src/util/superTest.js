import request from 'supertest';

export default async (number) => request(process.env.ROUTER_SERVICE_URL).get(`/route/${number}`);
