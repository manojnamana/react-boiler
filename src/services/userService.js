import instance from "./api";

export const getUserDetails = async (username) => {
  try {
    const url = `/users/${username}`;
    const response = await instance.get(url);
    return response;
  } catch (error) {
    return error.response;
  }
};
