import axios from "axios";
import Users from "./user";

// mock the axios module
jest.mock("axios");

test("should fetch users", () => {
  const users = [{ name: "Bob" }];
  const res = { data: users };
  axios.get.mockResolvedValue(res);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then((data) => expect(data).toEqual(users));
});
