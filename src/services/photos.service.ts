import APIService from "@/services/api.service";

const { NEXT_PUBLIC_API_BASE_URL } = process.env;

class PhotosService extends APIService {
  constructor() {
    super(NEXT_PUBLIC_API_BASE_URL || "https://api.unsplash.com");
  }

  async list(url: string = "/photos") {
    return this.get(url)
      .then((response) => {
        const { data } = response;
        return data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async random(config?: any) {
    return this.get("/photos/random", config)
      .then((response) => {
        const { data } = response;
        return data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getPhoto(photoId: string) {
    return this.get(`/photos/${photoId}`)
      .then((response) => {
        const { data } = response;
        return data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

const photosService = new PhotosService();

export default photosService;
