import { BiSolidPhoneCall, BiSolidVideo } from "react-icons/bi";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import FriendInfo from "./FriendInfo";
import Message from "./Message";
import MessageSend from "./MessageSend";

const RightSide = ({
  currentFriend,
  inputHandle,
  newMessage,
  sendMessage,
  message,
  scrollRef,
  emojiSend,
  imageSend,
  activeUsers,
  typingMessage,
}) => {
  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img src={currentFriend?.image} alt="" />
                    {activeUsers &&
                    activeUsers.length > 0 &&
                    activeUsers.some(
                      (u) => u.userEmail === currentFriend?.email
                    ) ? (
                      <div className="active-icon"></div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="name">
                    <h3>{currentFriend?.name}</h3>
                  </div>
                </div>

                <div className="icons">
                  <div className="icon">
                    <BiSolidPhoneCall />
                  </div>

                  <div className="icon">
                    <BiSolidVideo />
                  </div>

                  <div className="icon">
                    <label htmlFor="dot">
                      <HiDotsCircleHorizontal />
                    </label>
                  </div>
                </div>
              </div>

              <Message
                message={message}
                currentFriend={currentFriend}
                scrollRef={scrollRef}
                typingMessage={typingMessage}
              />
              <MessageSend
                inputHandle={inputHandle}
                newMessage={newMessage}
                sendMessage={sendMessage}
                emojiSend={emojiSend}
                imageSend={imageSend}
              />
            </div>
          </div>

          <div className="col-4">
            <FriendInfo
              currentFriend={currentFriend}
              activeUsers={activeUsers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
