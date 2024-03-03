import myRequest from '../index.js';

export default function getAllHouse() {
  return myRequest.get({
    url: '/home/houselist',
  });
}
