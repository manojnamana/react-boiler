import axios from "axios";
import { BACKEND_URL } from "./appConstants";
import instance from "./api";

export const getResourceDetails = async (claim_id) => {
  try {
    const url = `/documents/${claim_id}/documents`;
    const response = await instance.get(url);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const uploadResouceFile = async (claim_id, File) => {
  const url = `${BACKEND_URL}/documents/${claim_id}/upload`;

  const formData = new FormData();
  formData.append("file", File);
  const token = sessionStorage.getItem("auth")
    ? JSON.parse(sessionStorage.getItem("auth")).id_token
    : null;

  try {
    const response = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
