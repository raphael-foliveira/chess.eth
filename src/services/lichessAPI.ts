import axios from "axios";

const lichessAPI = axios.create({
  baseURL: "https://lichess.org/api",
  headers: {
    Authorization: "Bearer lip_nKJP0LZVkhBcg3Utyunt",
  },
});

export { lichessAPI };
