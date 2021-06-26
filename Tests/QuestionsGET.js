/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 100,
  duration: '1s',
};

export default function () {
  const res = http.get('http://localhost:3000/qa/questions?product_id=351851');
  check(res, {
    'is status 200': (r) => r.status === 200,
    'is duration below 2 seconds': (r) => r.timings.duration < 2000,
  });
  sleep(1);
}
