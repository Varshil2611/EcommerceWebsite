import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const predefinedOptions = [
    "What are your Bestsellers products?",
    "What payment methods do you accept?",
    "Do you have discounts?",
    "Track Order?",
  ];

  const sendMessage = async (message) => {
    if (!message.trim()) return; // Prevent sending empty messages

    const newMessages = [...messages, { sender: "user", text: message }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      setTimeout(() => {
        setMessages([...newMessages, { sender: "bot", text: data.response }]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { sender: "bot", text: "⚠️ Error: Could not connect. Please try again." }]);
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Chat Button */}
      {!isOpen ? (
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-110"
          onClick={() => setIsOpen(true)}
        >
          💬 Chat with Vash
        </button>
      ) : (
        <div
          className={`w-80 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 
          transition-all duration-300 ease-in-out transform 
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          {/* Header */}
          <div className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
            <span>Vash - Virtual Assistant</span>
            <button
              className="text-white text-lg"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 max-w-xs rounded-lg ${
                    msg.sender === "user" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <strong>{msg.sender === "user" ? "You" : "Vash"}:</strong>{" "}
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-900 px-3 py-2 rounded-lg">
                  <strong>Vash:</strong> <em>typing...</em>
                </div>
              </div>
            )}
          </div>

          {/* Input & Predefined Options */}
          <div className="p-4 border-t border-gray-300">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && input.trim()) sendMessage(input);
                }}
                autoFocus
              />
              <button
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}  // Prevent clicking when input is empty
              >
                Send
              </button>
            </div>

            {/* Predefined Options */}
            <div className="flex flex-wrap gap-2 mt-2">
              {predefinedOptions.map((option, index) => (
                <button
                  key={index}
                  className="px-3 py-1 text-sm border border-gray-400 rounded-full hover:bg-gray-200 transition"
                  onClick={() => sendMessage(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
