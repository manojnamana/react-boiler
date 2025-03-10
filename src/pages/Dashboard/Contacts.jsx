import React, { useState } from "react";

const conversationsData = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how's it going?",
    messages: [
      { sender: "John Doe", text: "Hey, how's it going?" },
      { sender: "You", text: "All good, how about you?" },
      { sender: "John Doe", text: "Doing great, thanks!" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Let's catch up tomorrow!",
    messages: [
      { sender: "Jane Smith", text: "Let's catch up tomorrow!" },
      { sender: "You", text: "Sure, what time works for you?" },
    ],
  },
  {
    id: 3,
    name: "Michael Brown",
    lastMessage: "Got the files, thanks!",
    messages: [
      { sender: "Michael Brown", text: "Got the files, thanks!" },
      { sender: "You", text: "You're welcome!" },
    ],
  },
];

const Contacts = () => {
  const [conversations, setConversations] = useState(conversationsData);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      const updatedConversations = conversations.map((conversation) => {
        if (conversation.id === selectedConversation.id) {
          return {
            ...conversation,
            messages: [
              ...conversation.messages,
              { sender: "You", text: messageInput.trim() },
            ],
            lastMessage: messageInput.trim(),
          };
        }
        return conversation;
      });

      setConversations(updatedConversations);
      setSelectedConversation({
        ...selectedConversation,
        messages: [
          ...selectedConversation.messages,
          { sender: "You", text: messageInput.trim() },
        ],
      });
      setMessageInput(""); // Clear input
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Contacts List */}
      <div className="w-1/3 bg-white border-r border-gray-300 sm:w-full lg:w-1/3">
        <div className="p-4 border-b border-gray-300">
          <h1 className="text-lg font-bold">Conversations</h1>
        </div>
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 cursor-pointer hover:bg-gray-200 ${
                selectedConversation?.id === conversation.id
                  ? "bg-gray-200"
                  : ""
              }`}
            >
              <h2 className="text-md font-semibold">{conversation.name}</h2>
              <p className="text-sm text-gray-600 truncate">
                {conversation.lastMessage}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col sm:w-full lg:flex-1">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-300">
              <h2 className="text-lg font-bold">{selectedConversation.name}</h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {selectedConversation.messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.sender === "You" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      message.sender === "You"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-gray-300">
              <div className="flex">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-600">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
