import axios from "axios";
export default async function handler(method, params) {
  const axiosApi = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 1000 * 3,
    headers: { "Access-Control-Allow-Origin": "*" },
  });

  const response = {};

  try {
    switch (method) {
      case "GET":
        const getData = await axiosApi.get("/");
        Object.assign(response, {
          data: getData.data,
        });
        break;
      case "POST":
        await axiosApi.post("/new-pokemon", { ...params.body });
        break;
      case "PUT":
        await axiosApi.put(`/update-pokemon/${params.query.id}`, {
          ...params.body,
        });
        break;
      case "DELETE":
        await axiosApi.delete(`/delete-pokemon/${params.query.id}`);
        break;
      default:
        const error = new Error();
        error.code = 405;
        error.message = "Method Not Allowed";
        throw error;
    }
  } catch (error) {
    console.log(error);
    Object.assign(response, {
      status: error.code || 500,
      error: error.message,
      data: "API Error",
    });
  }

  return response;
}
