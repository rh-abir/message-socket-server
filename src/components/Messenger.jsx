import { useContext, useEffect, useMemo, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { io } from "socket.io-client";
import { getFriends } from "../api/auth";
import {
  ImageMessageSend,
  getMessage,
  messageSend,
} from "../api/messageAction";
import { AuthContext } from "../provider/AuthPorvider";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import RightSide from "./RightSide";

import useSound from "use-sound";
import notificationSound from "../audio/notification.wav";
import sendingSound from "../audio/send.wav";

const Messenger = () => {
  const { user, message, setMessage } = useContext(AuthContext);

  const myInfo = useMemo(() => {
    return {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    };
  }, [user]);

  const [notificationSoundPlay] = useSound(notificationSound);
  const [sendingPlay] = useSound(sendingSound);

  const [friends, setFriends] = useState([]);

  const [currentFriend, setCurrentFriend] = useState("");

  const [socketMessage, setSocketMessage] = useState("");

  const [typingMessage, setTypingMessage] = useState("");

  const [newMessage, setNewMessage] = useState("");

  const [activeUsers, setActiveUser] = useState([]);

  const scrollRef = useRef();

  const socket = useRef();

  // console.log(user);

  //  sokcit server connection
  useEffect(() => {
    socket.current = io("wss://poised-tartan-stick.glitch.me");
    socket.current.on("getMessage", (data) => {
      // console.log(data);
      setSocketMessage(data);
    });

    socket.current.on("typingMessageGet", (data) => {
      // console.log(data);
      setTypingMessage(data);
    });
  }, []);

  // console.log(socketMessage);

  //send user infon in socket
  useEffect(() => {
    socket.current.emit("addUser", user?.email, myInfo);
  }, [user, myInfo]);

  // get all user connection in socket
  useEffect(() => {
    socket.current.on("getUser", (users) => {
      const filterUser = users.filter((u) => u.userEmail !== user?.email);
      // console.log(filterUser);
      setActiveUser(filterUser);
    });
  }, [user]);

  // get message spacific users
  useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.messageData.senderEmail === currentFriend.email &&
        socketMessage.messageData.reseverEmail === user?.email
      ) {
        setMessage((pre) => [...pre, socketMessage]);
        // console.log(socketMessage, message);
      }
    }
    setSocketMessage("");
  }, [socketMessage, currentFriend, user, setMessage]);

  useEffect(() => {
    if (
      socketMessage &&
      socketMessage.messageData.senderEmail !== currentFriend.email &&
      socketMessage.messageData.reseverEmail === user?.email
    ) {
      notificationSoundPlay();
      toast.success(
        `${socketMessage.messageData.senderName}  send a new message`
      );
    }
  }, [socketMessage, currentFriend, user, notificationSoundPlay]);

  const inputHandle = (e) => {
    setNewMessage(e.target.value);

    socket.current.emit("typingMessage", {
      senderEmail: user.email,
      reseverEmail: currentFriend.email,
      msg: e.target.value,
    });
  };

  // send message and get send message merge previous message
  const sendMessage = (e) => {
    e.preventDefault();
    sendingPlay();
    const data = {
      senderName: user?.displayName,
      senderEmail: user.email,
      reseverEmail: currentFriend.email,
      time: new Date(),
      message: {
        text: newMessage ? newMessage : "❤️",
        image: "",
      },
    };

    socket.current.emit("sendMessage", {
      senderName: user?.displayName,
      senderEmail: user.email,
      reseverEmail: currentFriend.email,
      time: new Date(),
      message: {
        text: newMessage ? newMessage : "❤️",
        image: "",
      },
    });

    socket.current.emit("typingMessage", {
      senderEmail: user.email,
      reseverEmail: currentFriend.email,
      msg: "",
    });

    messageSend(data).then((mess) => setMessage((prev) => [...prev, mess]));

    setNewMessage("");
  };

  // get emuji and save new message
  const emojiSend = (emu) => {
    // console.log(emu);
    setNewMessage((pre) => `${pre}` + emu);
    socket.current.emit("typingMessage", {
      senderEmail: user.email,
      reseverEmail: currentFriend.email,
      msg: emu,
    });
  };

  const imageSend = (event) => {
    if (event.target.files.length !== 0) {
      sendingPlay();
      const imageName = event.target?.files[0];

      const formData = new FormData();
      formData.append("image", imageName);

      const url = `https://api.imgbb.com/1/upload?key=${"c60c31f11bc9fbfc3255c71c3908b8ee"}`;

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageData) => {
          const imageUrl = imageData.data.display_url;
          const datas = {
            senderName: user?.displayName,
            senderEmail: user.email,
            reseverEmail: currentFriend.email,
            message: {
              text: "",
              image: imageUrl,
            },
          };

          socket.current.emit("sendMessage", {
            senderName: user?.displayName,
            senderEmail: user.email,
            reseverEmail: currentFriend.email,
            time: new Date(),
            message: {
              text: "",
              image: imageUrl,
            },
          });

          ImageMessageSend(datas).then((mess) =>
            setMessage((prev) => [...prev, mess])
          );
          // console.log(datas);
        });

      // console.log(imageName);
    }
  };

  // get all user without current user
  useEffect(() => {
    getFriends(user?.email).then((data) => setFriends(data));
  }, [user]);

  // set a default friend
  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0]);
    }
  }, [friends]);

  // get current user and friend message
  useEffect(() => {
    if (currentFriend && user) {
      const email = {
        myEmail: user.email,
        fdEmail: currentFriend.email,
      };

      // setMessage([]);

      getMessage(email).then((data) => {
        setMessage(data);
      });
    }
    // console.log(currentFriend.email);
  }, [currentFriend, user, setMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // console.log(message);

  return (
    <div className="messenger">
      <Toaster
        position={"top-right"}
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "18px",
          },
        }}
      />
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={user?.photoURL} alt="" />
                </div>
                <div className="name">
                  <h3>{user?.displayName}</h3>
                </div>
              </div>

              <div className="icons">
                <div className="icon">
                  <BsThreeDots />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
              </div>
            </div>

            <div className="friend-search">
              <div className="search">
                <button>
                  <BiSearch />
                </button>
                <input
                  type="text"
                  className="form-control"
                  placeholder="search"
                />
              </div>
            </div>

            <div className="active-friends">
              {activeUsers && activeUsers.length > 0
                ? activeUsers.map((u, i) => (
                    <ActiveFriend
                      key={i}
                      user={u}
                      setCurrentFriend={setCurrentFriend}
                    />
                  ))
                : ""}
            </div>

            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((fd, indx) => (
                    <div
                      key={indx}
                      onClick={() => setCurrentFriend(fd)}
                      className={
                        currentFriend._id === fd._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                    >
                      <Friends friend={fd} />
                    </div>
                  ))
                : "No Friends"}
            </div>
          </div>
        </div>
        {currentFriend ? (
          <RightSide
            activeUsers={activeUsers}
            currentFriend={currentFriend}
            inputHandle={inputHandle}
            newMessage={newMessage}
            sendMessage={sendMessage}
            message={message}
            scrollRef={scrollRef}
            emojiSend={emojiSend}
            imageSend={imageSend}
            typingMessage={typingMessage}
          />
        ) : (
          "Please selecet your friend"
        )}
      </div>
    </div>
  );
};

export default Messenger;
