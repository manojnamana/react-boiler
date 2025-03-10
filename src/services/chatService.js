import axios from "axios";
import instance from "./api";
import { parseChatHistory } from "../utils/chat";

export const fetchChatHistory = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.status === 200) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }
    const chatHistory = parseChatHistory(response.data);

    return chatHistory;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
};

export const sendMessage = async (claimId, message) => {
  try {
    const url = `/chatbot/query/?claim_id=${encodeURIComponent(
      claimId
    )}&prompt=${encodeURIComponent(message)}`;
    const response = await instance.post(url, {
      message,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
