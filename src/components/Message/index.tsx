import React, { useState, useEffect, useRef } from "react";
import "./index.css";

interface MessageProps {
  message: string;
  onClose: () => void;
  onClickOutside?: () => void;
}

const Message: React.FC<MessageProps> = (props) => {
  const [visible, setVisible] = useState(true);
  const { onClickOutside, message, onClose } = props;
  const ref = useRef<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
        onClose();
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return visible ? (
    <div ref={ref} className="message">
      <p>{message}</p>
      {/* <button onClick={handleClose}>关闭</button> */}
    </div>
  ) : null;
};

export default Message;
