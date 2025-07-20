import axios from "axios";

export const fonnteApiKey = process.env.FONNTE_API_KEY;
export const fonnteApiUrl = process.env.FONNTE_API_URL || "https://api.fonnte.com";

if (!fonnteApiKey) {
  throw new Error("FONNTE_API_KEY is not defined");
}

export const fonnteClient = axios.create({
  baseURL: fonnteApiUrl,
  headers: {
    Authorization: fonnteApiKey,
  },
});

fonnteClient.interceptors.request.use(
  (config) => {
    console.log("📤 [Request]", {
      method: config.method,
      url: (config.baseURL ?? "") + config.url,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("❌ [Request Error]", error);
    return Promise.reject(error);
  }
);

fonnteClient.interceptors.response.use(
  (response) => {
    console.log("📥 [Response]", {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("❌ [Response Error]", {
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      console.error("❌ [Network Error]", error.message);
    }
    return Promise.reject(error);
  }
);