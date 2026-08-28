import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, MapPin, ArrowLeft } from 'lucide-react';
import { useParking } from '../context/ParkingContext';

export const KovsieBotModal: React.FC = () => {
  const { isKovsieBotOpen, setIsKovsieBotOpen, askKovsieBot, botMessages, activeCampus } = useParking();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isKovsieBotOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setInputText('');
    setIsTyping(true);

    // Call context handler
    askKovsieBot(text);

    setTimeout(() => {
      setIsTyping(false);
    }, 600);
  };

  const quickQuestions = [
    'Where is Visitor Parking on Bloemfontein campus?',
    'What is the grace period for drop-offs?',
    'How do I renew my permit for 2026?',
    'What do I do if an ALPR gate does not open?',
    'Can I appeal a parking fine?'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
        {/* Header with Back Arrow Button */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsKovsieBotOpen(false)}
              className="p-1.5 px-2.5 rounded-xl text-slate-300 hover:text-amber-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center gap-1.5 transition-all font-semibold mr-1 cursor-pointer group"
              title="Go Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400 transform group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs">Back</span>
            </button>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">KovsieBot Campus Assistant</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Guided
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                Active Context: <span className="text-slate-200 font-medium">{activeCampus}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsKovsieBotOpen(false)}
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/50">
          {botMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5 mt-2">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(sug)}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-amber-400 border border-slate-800 text-[10px] font-semibold transition-colors text-left"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
                <span className="block text-[9px] text-slate-400/80 text-right mt-1 font-mono">{msg.timestamp}</span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3 text-xs text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="p-2.5 bg-slate-950 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="inline-block px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-amber-400 border border-slate-800 text-[11px] font-medium transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Text Input Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about UFS parking rules, gate clearance, or guest bays..."
            className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
