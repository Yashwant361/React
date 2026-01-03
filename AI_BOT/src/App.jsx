import { ExternalLink, Send } from 'lucide-react';
import { BASE_URL, GROQ_API_KEY } from './contentapi/constant.js';
import React, { useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [isTyping, setTyping] = useState(false);
  const [error, setError] = useState('');

  const createChat = async () => {
    if (!message.trim() || isTyping) return;

    const userMessage = message;
    setMessage('');
    setError('');


    setChats((prev) => [
      ...prev,
      {
        sender: "me",
        message: userMessage,
        createdAt: new Date()
      }
    ]);

    setTyping(true);

    try {
      const payload = {
        model: "llama-3.3-70b-versatile", 
        messages: [
          { role: "user", content: `Answer this in short - ${userMessage}` }
        ]
      };

      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Error details:", data);
        if (response.status === 429) {
          setError("Rate limit exceeded. Please wait a moment.");
        } else if (response.status === 401) {
          setError("Invalid API key. Check your credentials.");
        } else {
          setError(`Error: ${data.error?.message || "Failed to connect to Groq AI"}`);
        }
        return;
      }

      const aiResult = data?.choices?.[0]?.message?.content;

      if (aiResult) {
        setChats((prev) => [
          ...prev,
          {
            sender: "ai",
            message: aiResult,
            createdAt: new Date()
          }
        ]);
      } else {
        setError("No response from AI");
      }

    } catch (err) {
      console.error(err);
      setError("Failed to connect to Groq AI.");
    } finally {
      setTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      createChat();
    }
  };

  return (
    <div className='bg-gradient-to-br from-purple-50 via-white to-gray-50 min-h-screen'>
      <div className='lg:w-10/12 xl:w-8/12 mx-auto bg-white shadow-2xl min-h-screen relative'>
              
        <div className='bg-gradient-to-r from-purple-600 to-purple-800 text-white py-6 px-8 shadow-lg'>
          <h1 className='text-3xl font-bold flex items-center justify-center gap-3'>
            <span className='text-4xl'>💬</span>
            <span>Chat Bot</span>
          </h1>
          <p className='text-center text-purple-100 text-sm mt-2'></p>
        </div>
      
        <div className='p-6 lg:p-8 space-y-6 pb-48 overflow-y-auto' style={{ maxHeight: 'calc(100vh - 250px)' }}>
          {chats.length === 0 && (
            <div className='flex flex-col items-center justify-center py-20 text-gray-400'>
              <div className='text-6xl mb-4'></div>
              <p className='text-lg'></p>
            </div>
          )}

          {chats.map((item, index) => (
            <div
              key={index}
              className={`flex ${item.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-2xl px-5 py-4 rounded-2xl shadow-md ${
                  item.sender === "me"
                    ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-tr-none"
                    : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 rounded-tl-none"
                }`}
              >
                <div className='whitespace-pre-wrap leading-relaxed'>{item.message}</div>
                <div className={`flex justify-end text-xs mt-2 ${
                  item.sender === "me" ? "text-purple-100" : "text-gray-500"
                }`}>
                  {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {isTyping && (
          <div className='flex justify-start px-8 pb-2'>
            <div className='bg-gray-200 px-5 py-3 rounded-2xl rounded-tl-none'>
              <div className='flex gap-1'>
                <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'></div>
                <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce' style={{ animationDelay: '0.1s' }}></div>
                <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

       
        {error && (
          <div className='px-8 pb-4'>
            <div className='bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded shadow'>
              <p className='font-medium'>Error</p>
              <p className='text-sm'>{error}</p>
            </div>
          </div>
        )}
     
        <div className='fixed bottom-0 left-0 right-0 lg:left-auto lg:right-auto lg:w-10/12 xl:w-8/12 lg:mx-auto bg-white border-t-2 border-purple-100 shadow-2xl'>
          <div className='p-4 lg:p-6'>
            <div className='flex gap-3 items-end'>
              <div className='flex-1 relative'>
                <input
                  value={message}
                  disabled={isTyping}
                  className='bg-gray-50 border-2 border-gray-200 rounded-2xl px-6 py-4 w-full outline-none 
                    focus:border-purple-400 focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  placeholder={isTyping ? "AI is typing..." : "Type your message here..."}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <button
                onClick={createChat}
                disabled={isTyping || !message.trim()}
                className={`${
                  isTyping || !message.trim() 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl'
                }
                  px-6 py-4 rounded-2xl text-white transition-all duration-300 flex items-center gap-2 font-semibold`}
              >
                <Send size={20} />
                <span className='hidden sm:inline'>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;