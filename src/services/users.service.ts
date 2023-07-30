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
}

const usersService = new UsersService();

export default usersService;
