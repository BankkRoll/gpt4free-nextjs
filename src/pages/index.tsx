import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [messages, setMessages] = useState<{ text: string, sender: string }[]>([]);
  const [input, setInput] = useState("");
  const endOfChatRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      const response = await axios.get('/api/ask', {
        params: { prompt: input, model: "You" }
      });
      if (response.data.text) {
        setMessages(prevMessages => [...prevMessages, { text: response.data.text, sender: "bot" }]);
      }
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="overflow-auto h-96 w-full max-w-2xl border border-gray-300 p-4 rounded-md">
        {messages.map((msg, index) => (
          <div key={index} className={`text-left my-2 ${msg.sender === "bot" ? "text-green-500" : "text-blue-500"}`}>
            {msg.text}
          </div>
        ))}
        <div ref={endOfChatRef} />
      </div>
      <div className="w-full max-w-2xl mt-4">
        <input
          className="w-4/5 p-2 border border-gray-300 rounded-l-md"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button
          className="w-1/5 p-2 bg-blue-500 text-white rounded-r-md"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </main>
  );
}
