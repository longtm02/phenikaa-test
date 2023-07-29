import axios from "axios";
import { API_URL } from "../constants/api";

const axiosClient = axios.create({
  headers: {
    Accept: "applications/json",
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTVmMzY2ZWU4MmI5N2Y0NTQ3YzhiNmYxZTczODNjMSIsInN1YiI6IjY0YzNkNDU2MDI4ZjE0MDBiMGNmMzM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.itbm4-2NRiJSAFHNFz4zB4LeFhdVez9cZI5-hbOywVE`,
  },
  baseURL: API_URL,
});

export { axiosClient };
