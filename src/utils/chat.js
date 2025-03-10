export const parseChatHistory = (text) => {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  let chatHistory = [];

  const chatRegex = /\[(.*?)\] (USER|CLAUDE): (.*)/;

  for (const line of lines) {
    const match = line.match(chatRegex);
    if (match) {
      const timestamp = match[1];
      const sender = match[2];
      let message = match[3];

      try {
        let isParse = message.startsWith("[{") && message.endsWith("}]");
        if (isParse) {
          let text_regex = /'text': "(.*?)"/;
          let required_message = message.match(text_regex);
          if (required_message) {
            message = required_message[1];
          }
          message = message.replace(/\\n/g, "\n");
        }
      } catch (e) {
        // Keep message as a string if not JSON
      }

      chatHistory.push({ timestamp, sender, message });
    }
  }

  return chatHistory;
};
