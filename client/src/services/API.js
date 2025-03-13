import axios from "axios";

//set a base url which is stored in a variable
const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
//this api stores the url of the backend upto v1

//use the interceptor so whatever functionalites we use with axios now we can use with api also
API.interceptors.request.use((req) => {
  //if a user is logged in a token is generated and is stored in the local storage to get that we use an if condition that determines if it is present the authorization in the headers is fulfilled  with the token
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

//export API so that we can use it from anywhere
export default API;
//with the help of this API we can perform our crud operations
