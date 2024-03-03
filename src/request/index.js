import axios from 'axios';
import { BASE_URL, TIMEOUT } from './config';

class myRequest {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });
  }

  // 拦截器

  //这个封装的原因是axios返回的数据中 .data才是真正需要的数据
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(config) {
    return this.request({ ...config, method: 'get' });
  }
  post(config) {
    return this.request({ ...config, method: 'post' });
  }
}

export default new myRequest(BASE_URL, TIMEOUT);
