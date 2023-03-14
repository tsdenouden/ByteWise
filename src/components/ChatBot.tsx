import { useState, useRef } from "react";
import styles from "./ChatBot.module.css";

interface ChatMessage {
  id: number,
  content: string,
  author: string
}

const ChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatBoxRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (chatBoxRef.current && chatBoxRef.current.value.trim() != "") {        
        const newMessage: ChatMessage = {
          id: messages.length,
          content: chatBoxRef.current.value,
          author: "You"
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
      <input 
        type="text"
        ref={chatBoxRef}
        onKeyDown={handleKeyDown}
        className={styles.ChatBox}
      />
    </div>
  );
}

export default ChatBot;