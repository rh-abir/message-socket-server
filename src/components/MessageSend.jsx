import { AiFillGift } from "react-icons/ai";
import { BiMessageAltEdit } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { RiGalleryLine } from "react-icons/ri";

const MessageSend = ({
  inputHandle,
  newMessage,
  sendMessage,
  emojiSend,
  imageSend,
}) => {
  const emojis = [
    "😊",
    "✌",
    "😇",
    "😄",
    "😅",
    "😆",
    "😁",
    "😃",
    "😺",
    "🤮",
    "😢",
    "😈",
    "🖕",
    "💑",
    "😎",
    "😙",
    "😘",
  ];

  return (
    <div className="message-send-section">
      <input type="checkbox" id="emoji" />

      <div className="file hover-attachment">
        <div className="add-attachment">Add Attachment</div>
        <BsPlusCircle />
      </div>

      <div className="file hover-image">
        <div className="add-image">Add Image</div>
        <input
          onChange={imageSend}
          type="file"
          className="form-control"
          id="pic"
        />
        <label htmlFor="pic">
          <RiGalleryLine />
        </label>
      </div>

      <div className="file">
        <BiMessageAltEdit />
      </div>

      <div className="file hover-gift">
        <div className="add-gift">Add gift</div>
        <AiFillGift />
      </div>

      <div className="message-type">
        <input
          onChange={inputHandle}
          value={newMessage}
          type="text"
          className="form-control"
          name="message"
          id="message"
          placeholder="Aa"
        />
        <label htmlFor="emoji">😊</label>
      </div>

      <div onClick={sendMessage} className="file">
        ❤️
      </div>

      <div className="emoji-section">
        <div className="emoji">
          {emojis.map((emoji, ind) => (
            <span onClick={() => emojiSend(emoji)} key={ind}>
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageSend;
