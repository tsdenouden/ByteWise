import { useState, useRef, useEffect } from "react";
import styles from "./ChatBot.module.css";

interface ChatMessage {
  id: number,
  author: string,
  content: string
}

const ChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Ref for the container element that holds the chat message list
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Textarea for prompting
  const chatBoxRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // scroll to latest message
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);


  // If the Enter key is pressed (without Shift) in the textarea, 
  // submits the message if it is not blank.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // prevent newline
      e.preventDefault();
      if (chatBoxRef.current && chatBoxRef.current.value.trim() !== "") {        
        const newMessage: ChatMessage = {
          id: messages.length,
          author: "You",
          content: chatBoxRef.current.value
        };

        // clear textarea
        chatBoxRef.current.value = '';
        chatBoxRef.current.focus();
        
        setMessages(messages.concat(newMessage));
      }
    }
  }

  return (
    <div className={styles.ChatWindow}>
      <div 
        className={styles.ChatMessageListContainer} 
        ref={messagesContainerRef}
      >
        <ul className={styles.ChatMessageList}>
          {messages.map(message => 
            <li className={styles.ChatMessage} key={message.id}>
              <strong>{message.author}</strong>
              <p>{message.content}</p>
            </li>
          )}
        </ul>
      </div>
      <textarea
        onKeyDown={handleKeyDown}
        rows={5}
        placeholder="Enter prompt here"
        className={styles.ChatBox}
        ref={chatBoxRef}
      ></textarea>
    </div>
  );
}

export default ChatBot;