import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { IoMdSend } from "react-icons/io";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

const ChatBot = ({ isOpen, onOpenChange, user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  const getInitialBotMessage = () => ({
    from: "bot",
    text: `Hello ${user?.fName || ""}! I am AI assistant for Group Project. How can I help you today?`,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  useEffect(() => {
    if (user) setMessages([getInitialBotMessage()]);
  }, [user]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMessages = [
      ...messages,
      { from: "user", text: input, time: currentTime },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setTyping(true);

    // Add a temporary "typing" message
    const botTypingMessage = { from: "bot", text: "typing...", time: "" };
    setMessages((prev) => [...prev, botTypingMessage]);

    try {
      const res = await fetch(`${apiBaseUrl}/api/v1/user/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          messages: newMessages.map((m) => ({
            role: m.from === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      const botTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Replace "typing..." with real response
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { from: "bot", text: data.message, time: botTime },
      ]);
    } catch (err) {
      console.error(err);
      const botTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { from: "bot", text: "Error contacting AI.", time: botTime },
      ]);
    } finally {
      setLoading(false);
      setTyping(false);
    }
  };

  // Scroll to bottom
  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const clearChat = () => setMessages([getInitialBotMessage()]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogHeader className="p-4 rounded-md bg-blue-900">
          <DialogTitle className="text-center text-white">
            🤖AI Support
          </DialogTitle>
          <DialogDescription className="text-center text-white">
            Ask anything, we’re here to help.
          </DialogDescription>
        </DialogHeader>

        {/* Chat Area */}
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <div
              ref={scrollRef}
              className="h-[300px] w-full p-4 overflow-y-auto flex flex-col gap-3"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className="flex flex-col">
                  <div
                    className={`flex items-start gap-2 ${
                      msg.from === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.from === "bot" && (
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="AI Bot"
                        />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`px-2 py-1 rounded-lg text-sm max-w-[75%] break-words ${
                        msg.from === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      {msg.text === "typing..." ? <TypingDots /> : msg.text}
                    </div>
                  </div>
                  <div
                    className={`text-xs text-gray-500 mt-1 ${
                      msg.from === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        <div className="relative w-full p-2">
          <Textarea
            placeholder="Type your message..."
            className="w-full pr-12 resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button
            onClick={sendMessage}
            disabled={loading}
            className="absolute right-2 bottom-2 p-2 rounded-full bg-transparent hover:bg-gray-200 text-blue-600"
          >
            <IoMdSend size={20} />
          </Button>
        </div>

        {/* Footer */}
        <DialogFooter className="p-4 border-t flex justify-between gap-2">
          <Button variant="destructive" onClick={clearChat}>
            Clear Chat
          </Button>
          <DialogClose asChild>
            <Button variant="outline">End Chat</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBot;

// TypingDots component
const TypingDots = () => (
  <span className="inline-block w-20 h-2">
    <p class="text-gray-700 font-medium">
      Thinking<span class="animate-pulse">.</span>
      <span class="animate-pulse [animation-delay:200ms]">.</span>
      <span class="animate-pulse [animation-delay:400ms]">.</span>
    </p>
  </span>
);
