import React, { useState, useRef, useEffect } from 'react';
import { Shield, Send, Terminal, AlertTriangle, CheckCircle2, Bot, User } from 'lucide-react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am SecureGPT, designed by Shoaib Shaikh. I am your dedicated security education assistant, ready to help you learn about cybersecurity concepts, best practices, and common vulnerabilities. How can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const filterResponse = (response: string): string => {
    // First, handle identity-related responses with a consistent message
    const identityPhrases = [
      /i am securegpt/i,
      /this is securegpt/i,
      /my name is securegpt/i,
      /developed by/i,
      /designed by/i,
      /created by/i
    ];

    if (identityPhrases.some(phrase => phrase.test(response))) {
      return "I am SecureGPT, and I'm here to help you with cybersecurity topics. What would you like to know?";
    }

    // Remove any repeated mentions of SecureGPT or Shoaib Shaikh
    let filteredResponse = response;
    
    // Replace multiple occurrences of SecureGPT with pronouns after first mention
    const securegptMatches = filteredResponse.match(/securegpt/gi) || [];
    if (securegptMatches.length > 1) {
      filteredResponse = filteredResponse.replace(/securegpt/gi, (match, index) => {
        return index === filteredResponse.toLowerCase().indexOf('securegpt') ? match : 'I';
      });
    }

    // Remove any remaining identity claims or creator mentions
    filteredResponse = filteredResponse
      .replace(/\b(developed|created|designed)\s+by\s+[^,.!?]*/gi, '')
      .replace(/\b(i am|i'm)\s+an?\s+(ai|assistant|model|system)[^,.!?]*/gi, '')
      .replace(/\b(shoaib shaikh)/gi, '')
      .trim();

    // Clean up any double spaces or punctuation
    filteredResponse = filteredResponse
      .replace(/\s+/g, ' ')
      .replace(/\s+([.,!?])/g, '$1')
      .replace(/\s+$/g, '');

    // Ensure the response starts with a capital letter
    filteredResponse = filteredResponse.charAt(0).toUpperCase() + filteredResponse.slice(1);

    return filteredResponse;
  };

  const generateResponse = async (prompt: string) => {
    try {
      // Handle identity questions with a consistent response
      const identityKeywords = ['who are you', 'what are you', 'your name', 'who made you', 'who created you'];
      if (identityKeywords.some(keyword => prompt.toLowerCase().includes(keyword))) {
        return "I am SecureGPT, a specialized security education assistant focused on helping users understand and implement cybersecurity best practices.";
      }

      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-coder:6.7b',
          prompt: `You are a cybersecurity expert assistant. Focus on providing accurate and helpful information about security topics. Avoid mentioning AI models or assistants. User question: ${prompt}`,
          stream: false
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      return filterResponse(data.response);
    } catch (error) {
      console.error('Error generating response:', error);
      return 'I apologize, but I encountered an error while generating a response. Please ensure the local server is running and try again.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await generateResponse(input);
      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-emerald-500" />
            <a href="https://github.com/shoaibbshaikhh" target='__blank'>
            <h1 className="text-xl font-bold">SecureGPT</h1>
            <p className="text-xs text-gray-400 absolute left-20 top-11">by Shoaib Shaikh</p></a>
          </div>
          <div className="flex items-center space-x-4">
            <Terminal className="w-5 h-5 text-gray-400" />
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col h-[calc(100vh-4rem)]">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 ${
                message.role === 'assistant' ? 'bg-gray-800' : 'bg-gray-700'
              } p-4 rounded-lg`}
            >
              {message.role === 'assistant' ? (
                <Bot className="w-6 h-6 text-emerald-500" />
              ) : (
                <User className="w-6 h-6 text-blue-500" />
              )}
              <div className="flex-1">
                <p className="text-sm text-gray-300">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about security concepts..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            <Send className="w-4 h-4" />
            <span>{isLoading ? 'Generating...' : 'Send'}</span>
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;