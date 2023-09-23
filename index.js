const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (userEmail, socketId, userInfo) => {
  const checkUser = users.some((u) => u.userEmail === userEmail);
  if (!checkUser) {
    users.push({ userEmail, socketId, userInfo });
  }
};

const userRemove = (socketId) => {
  users = users.filter((u) => u.socketId !== socketId);
};

const findFriend = (email) => {
  return users.find(u => u.userEmail === email)
}

io.on("connection", (socket) => {
  console.log("user is connected....");

  socket.on("addUser", (userEmail, userInfo) => {
    addUser(userEmail, socket.id, userInfo);

    io.emit("getUser", users);
  });


  socket.on('sendMessage', (data) => {

    const user = findFriend(data.reseverEmail)
    // console.log(data)

    if(user !== undefined) {
      socket.to(user.socketId).emit('getMessage', {messageData: {
        senderName : data.senderName,
        senderEmail : data.senderEmail,
        reseverEmail: data.reseverEmail,
        time: data.time,
        message: {
          text: data.message.text,
          image: data.message.image,
        }

      }})
    }


  })


  socket.on('typingMessage', (data) => {
    // console.log(data)

    const user = findFriend(data.reseverEmail)
    // console.log(data)  

    if(user !== undefined) {
      socket.to(user.socketId).emit('typingMessageGet', {messageData: {

        senderEmail : data.senderEmail,
        reseverEmail: data.reseverEmail,
        msg: data.msg
      }})
    }



  })

  socket.on("disconnect", () => {
    console.log("user disconnect...");
    userRemove(socket.id);
    io.emit("getUser", users);
  });
});
