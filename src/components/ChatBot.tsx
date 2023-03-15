import { useState, useRef } from "react";
import styles from "./ChatBot.module.css";

interface ChatMessage {
  id: number,
  author: string,
  content: string
}

const ChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatBoxRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (chatBoxRef.current && chatBoxRef.current.value.trim() != "") {        
        const newMessage: ChatMessage = {
          id: messages.length,
          author: "You",
          content: chatBoxRef.current.value
        };

        chatBoxRef.current.value = '';
        chatBoxRef.current.focus();
        
        setMessages(messages.concat(newMessage));
      }
    }
  }

  return (
    <div className={styles.ChatWindow}>
      <ul className={styles.ChatMessageList}>
        {messages.map(message => 
          <li className={styles.ChatMessage} key={message.id}>
            <strong>{message.author}</strong>
            <p>{message.content}</p>
          </li>
        )}
      </ul>
      <textarea
        className={styles.ChatBox}
        onKeyDown={handleKeyDown}
        rows={5}
        placeholder="Enter prompt here"
        ref={chatBoxRef}
      ></textarea>
    </div>
  );
}

export default ChatBot;