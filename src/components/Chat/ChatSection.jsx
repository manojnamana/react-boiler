import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Paper,
  Stack,
  Grid,
  Typography,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { fetchChatHistory, sendMessage } from "../../services/chatService";
import { isNotNullOrEmptyArray } from "../../utils/common";
import { Chat } from "@mui/icons-material";

const ChatSection = ({ url, claimId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (url) {
      setChatLoading(true);
      fetchChatHistory(url).then((messages) => {
        setMessages(messages);
        setChatLoading(false);
      });
    }
  }, [url]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendChatMessage = async () => {
    setChatLoading(true);
    if (!newMessage.trim()) return;
    try {
      let response = await sendMessage(claimId, newMessage);
      if (response.status === 200) {
        const { ai_response } = response.data;
        const { text } = (ai_response || [])[0] || {};
        setMessages([
          ...messages,
          {
            message: newMessage,
            sender: "USER",
            timestamp: new Date().toLocaleString(),
          },
          {
            message: text,
            sender: "CLAUDE",
            timestamp: new Date().toLocaleString(),
          },
        ]);
        setChatLoading(false);
      } else {
        throw new Error(
          `Failed to send message: ${response.status} ${response.statusText}`
        );
      }
    } catch (e) {
      console.log(e);
      setMessages([
        ...messages,
        {
          message: newMessage,
          sender: "USER",
          timestamp: new Date().toLocaleString(),
        },
        {
          message:
            "I am sorry, I am unable to process your request at the moment",
          sender: "CLAUDE",
          timestamp: new Date().toLocaleString(),
        },
      ]);
      setChatLoading(false);
    }
    setNewMessage("");
  };

  if (!url) {
    return (
      <Container maxWidth="sm" style={{ padding: "20px" }}>
        <Typography variant="h5">
          Start by sending `Hi` to initiate a conversation regarding the claim
        </Typography>
      </Container>
    );
  }

  if (!claimId) {
    return (
      <Container maxWidth="sm" style={{ padding: "20px" }}>
        <Typography variant="h5">
          No claim selected. Please select a claim to start the chat.
        </Typography>
      </Container>
    );
  }

  const GetTimeText = (text) => {
    const hours = text?.split(" ");
    return <span>{hours[1]}</span>;
  };

  return (
    <Grid item xs={12} md={8}>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Stack
          height={402}
          sx={{
            overflowY: "scroll",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Stack>
            {chatLoading ? (
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                <Typography>
                  <CircularProgress />
                </Typography>
              </Stack>
            ) : isNotNullOrEmptyArray(messages) ? (
              messages.map((message, index) => (
                <Stack
                  key={index}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                  sx={{
                    display: "flex",
                    flexDirection: "row",

                    justifyContent:
                      message.sender === "USER" ? "flex-end" : "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "start",
                      backgroundColor:
                        message.sender === "USER" ? "#c8fad6" : "whitesmoke",
                      maxWidth: 350,
                      minWidth: 100,
                      borderRadius: 2,
                      p: 0.8,
                      m: 2,
                    }}
                  >
                    {message.message}
                    <Typography
                      sx={{
                        fontSize: 10,
                        p: 0,
                        color: "gray",
                        textAlign: "right",
                      }}
                    >
                      {GetTimeText(message.timestamp)}
                    </Typography>
                  </Typography>
                </Stack>
              ))
            ) : (
              <Stack
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"row"}
                alignItems={"center"}
                height={"50vh"}
              >
                <Typography variant="h6" textAlign={"center"}>
                  <Chat /> Start by sending `Hi` to initiate a conversation
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>

        {!chatLoading && (
          <FormControl variant="outlined">
            <Input
              fullWidth
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              sx={{ p: 1, bgcolor: "#80808029" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton disabled={!newMessage} onClick={sendChatMessage}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendChatMessage();
                }
              }}
            />
          </FormControl>
        )}
      </Paper>
    </Grid>
  );
};

export default ChatSection;
