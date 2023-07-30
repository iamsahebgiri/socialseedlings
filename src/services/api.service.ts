import axios from "axios";

abstract class APIService {
  private clientId = process.env.NEXT_PUBLIC_API_CLIENT_ID;
  protected baseURL: string;
  protected headers: any = {};

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  getHeaders() {
    return {
      Authorization: `Client-ID ${this.clientId}`,
    };
  }

  getWithoutBase(url: string, config = {}): Promise<any> {
    return axios({
      method: "get",
      url: url,
      headers: this.getHeaders(),
      ...config,
    });
  }

  get(url: string, config = {}): Promise<any> {
    return axios({
      method: "get",
      url: this.baseURL + url,
      headers: this.getHeaders(),
      ...config,
    });
  }

  post(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "post",
      url: this.baseURL + url,
      data,
      headers: this.getHeaders(),
      ...config,
    });
  }

  put(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "put",
      url: this.baseURL + url,
      data,
      headers: this.getHeaders(),
      ...config,
    });
  }

  patch(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "patch",
      url: this.baseURL + url,
      data,
      headers: this.getHeaders(),
      ...config,
    });
  }

  delete(url: string, data?: any, config = {}): Promise<any> {
    return axios({
      method: "delete",
      url: this.baseURL + url,
      data: data,
      headers: this.getHeaders(),
      ...config,
    });
  }

  request(config = {}) {
    return axios(config);
  }
}

export default APIService;
