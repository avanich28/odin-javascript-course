import axios from "axios";

// 4) Mocking Modules
class Users {
  static all() {
    return axios.get("/users.json").then((res) => res.data);
  }
}
export default Users;
