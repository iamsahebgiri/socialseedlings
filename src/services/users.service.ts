import APIService from "@/services/api.service";

const { NEXT_PUBLIC_API_BASE_URL } = process.env;

class UsersService extends APIService {
  constructor() {
    super(NEXT_PUBLIC_API_BASE_URL || "https://api.unsplash.com");
  }

  async getPublicProfile(username: string) {
    return this.get(`/users/${username}`)
      .then((response) => {
        const { data } = response;
        return data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getPhotos(username: string) {
    return this.get(`/users/${username}/photos`)
      .then((response) => {
        const { data } = response;
        return data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getPhotosInfinite(url: string) {
    return this.get(url)
      .then((response) => {
        const { data } = response;
        return data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

const usersService = new UsersService();

export default usersService;
