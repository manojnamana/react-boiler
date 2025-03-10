import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const ChatSection = ({ claimId }) => {
  const { authInfo } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);
  const chatBoxRef = useRef(null);

  // Fetch initial chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        // const response = await fetch(`/api/claims/${claimId}/chats`);
        // if (!response.ok) {
        //   throw new Error("Failed to fetch chat history");
        // }
        // const data = await response.json();
        const data = {
          chats: [
            {
              id: "CH001",
              user: { id: "U001", name: "John Doe" },
              message: "Can you provide more details about the rejection?",
              timestamp: "2025-01-11T09:00:00Z",
            },
            {
              id: "CH002",
              user: { id: "U002", name: "Admin" },
              message: "Please refer to the attached document.",
              timestamp: "2025-01-11T09:15:00Z",
            },
          ],
        };

        setMessages(data.chats);
      } catch (err) {
        console.error("Error fetching chat history:", err.message);
      }
    };

    fetchChatHistory();
  }, [claimId]);

  // WebSocket for real-time chat updates
  useEffect(() => {
    const socket = new WebSocket(
      `wss://example.com/ws/claims/${claimId}/chats`
    );

    socket.onmessage = (event) => {
      const newChat = JSON.parse(event.data);
      setMessages((prev) => [...prev, newChat]);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      socket.close();
    };
  }, [claimId]);

  // Scroll to the latest message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      userId: authInfo.id,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(`/api/claims/${claimId}/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Add to the local state (optimistic update)
      setMessages((prev) => [...prev, { ...messageData, user: authInfo }]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err.message);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <Card className="shadow-md mb-6 w-full h-screen">
      <CardContent>
        <Typography variant="h5" className="font-bold mb-4">
          Chat
        </Typography>

        {/* Chat Box */}
        <div
          className="bg-gray-100 border rounded p-4 overflow-y-auto h-full"
          // style={{ height: "500px" }}
          ref={chatBoxRef}
        >
          {messages.length === 0 ? (
            <Typography>No chats found for this claim.</Typography>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.user.id === authInfo.id ? "justify-end" : "justify-start"
                } mb-3`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.user.id === authInfo.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  <Typography className="text-sm">{msg.message}</Typography>
                  <Typography className="text-xs text-gray-500 mt-1">
                    {msg.user.id === authInfo.id ? "You" : msg.user.name},{" "}
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </Typography>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Error Message */}
        {error && (
          <Typography className="text-red-500 mt-2 text-sm">{error}</Typography>
        )}

        {/* Message Input Box */}
        <div className="flex items-center mt-4">
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            variant="outlined"
            placeholder="Type your message"
            fullWidth
            size="small"
          />
          <Button
            variant="contained"
            color="primary"
            className="ml-2"
            onClick={sendMessage}
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatSection;
