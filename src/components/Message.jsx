import { useContext } from "react";
import { AuthContext } from "../provider/AuthPorvider";

const Message = ({ message, currentFriend, scrollRef, typingMessage }) => {
  const { user } = useContext(AuthContext);

  // console.log(message.((m) => console.log(m)));
  // console.log("current ====", currentFriend, "typing ===", typingMessage);

  console.log(message.map((e) => console.log(e)));

  return (
    <>
      <div className="message-show">
        {message && message.length > 0
          ? message?.map((m, indx) =>
              m?.messageData?.senderEmail === user.email ? (
                <div ref={scrollRef} key={indx} className="my-message">
                  <div className="image-message">
                    <div className="my-text-">
                      <p className="message-text">
                        {m.messageData?.message?.text === "" ? (
                          <img src={m.messageData?.message.image} />
                        ) : (
                          m.messageData?.message?.text
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="time">2 jun 2023</div>
                </div>
              ) : (
                <div ref={scrollRef} key={indx} className="fd-message">
                  <div className="image-message-time">
                    <img src={currentFriend?.image} alt="" />
                    <div className="message-time">
                      <div className="fd-text">
                        <p className="message-text">
                          {m.messageData?.message?.text === "" ? (
                            <img src={m.messageData?.message.image} />
                          ) : (
                            m.messageData?.message?.text
                          )}
                        </p>
                      </div>

                      <div className="time">5 jun 2023</div>
                    </div>
                  </div>
                </div>
              )
            )
          : ""}
      </div>

      {typingMessage &&
      typingMessage.messageData.msg &&
      typingMessage.messageData.senderEmail === currentFriend.email ? (
        <div className="typing-message">
          <div className="fd-message">
            <div className="image-message-time">
              <img src={currentFriend?.image} alt="" />
              <div className="message-time">
                <div className="fd-text">
                  <p className="message-text">Typing message ...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Message;
