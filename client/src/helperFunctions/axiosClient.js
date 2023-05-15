import axios from "axios";

let clientURL;
if (process.env.NODE_ENV === "production") {
  clientURL = process.env.PORT;
} else {
  clientURL = "http://localhost:9000";
}

const axiosClient = axios.create({
  baseURL: clientURL,
  json: true,
});

export default axiosClient;
