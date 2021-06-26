/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '1s',
};

export default function () {
  http.get('http://localhost:3000/products/1');
  sleep(1);
}
