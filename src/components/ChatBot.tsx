import { useState, useRef, useEffect } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import Prompt from "../services/PromptAI";
import styles from "./ChatBot.module.css";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const ChatBot = ({ code }: { code: string }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hi there! I'm an AI chatbot designed to assist you with your web application.
To get started, edit the code in the text editor or prompt me for further guidance.`,
    },
  ]);

  // Used to prevent user from spamming prompts
  // Chatbox gets disabled after sending a prompt, and re-enabled when AI responds
  const [isTextAreaDisabled, setTextAreaDisabled] = useState<boolean>(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // scroll to latest message
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }

    if (messages.length >= 1) {
      // If last message was sent by the User,
      // request the AI to respond
      let lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user") {
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
        const newMessage: ChatMessage = {
          role: "user",
          content: chatBoxRef.current.value,
        };

        chatBoxRef.current.value = "";
        chatBoxRef.current.focus();

        setMessages(messages.concat(newMessage));
        setTextAreaDisabled(true);
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
