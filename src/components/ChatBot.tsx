import { useState, useRef, useEffect } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import Prompt from "../services/PromptAI";
import { ChatMessage } from "../types";
import styles from "./ChatBot.module.css";

interface ChatBotProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  code?: string;
}

const ChatBot = ({ messages, setMessages, code }: ChatBotProps) => {
  // Used to prevent user from spamming prompts
  // Chatbox gets disabled after sending a prompt, and re-enabled when AI responds
  const [isTextAreaDisabled, setTextAreaDisabled] = useState<boolean>(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // scroll to latest message
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }

    if (messages.length >= 1) {
      // If the last message was sent by the user, request the AI to respond
      let lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user") {
        // Prevent user from sending another prompt until AI responds
        setTextAreaDisabled(true);

        Prompt(messages, code).then((res) => {
          const newAssistantMessage: ChatMessage = {
            role: "assistant",
            content: res.choices[0].message.content,
          };
          setMessages(messages.concat(newAssistantMessage));
          setTextAreaDisabled(false);
        });
      }
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (chatBoxRef.current && chatBoxRef.current.value.trim() !== "") {
        // Send new chat message
        const newMessage: ChatMessage = {
          role: "user",
          content: chatBoxRef.current.value,
        };

        chatBoxRef.current.value = "";
        chatBoxRef.current.focus();

        setMessages(messages.concat(newMessage));
      }
    }
  };

  return (
    <div className={styles.ChatWindow}>
      <div
        className={styles.ChatMessageListContainer}
        ref={messagesContainerRef}
      >
        <ul className={styles.ChatMessageList}>
          {messages.map((message, index) => (
            <li
              className={
                message.role === "user" ? styles.UserMessage : styles.GPTMessage
              }
              key={index}
            >
              {message.role === "user" ? (
                <>
                  <strong>You</strong>
                  <p>{message.content}</p>
                </>
              ) : (
                <>
                  <strong>AI Assistant</strong>
                  <MarkdownRenderer source={message.content} />
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <textarea
        onKeyDown={handleKeyDown}
        rows={5}
        placeholder={
          isTextAreaDisabled
            ? "Waiting for assistant..."
            : "Enter prompt here..."
        }
        disabled={isTextAreaDisabled}
        className={styles.ChatBox}
        ref={chatBoxRef}
      ></textarea>
    </div>
  );
};

export default ChatBot;
