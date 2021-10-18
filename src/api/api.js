import axios from "axios";

const baseUrl = "https://webhook.site/130b0f97-5cdb-4682-803c-dd01bea69cf5";

export const ticketFormAPI = {
  sendData: (data) => {
   return axios({
      method: "post",
      url: baseUrl,
      data: data,
    });
  },
};
