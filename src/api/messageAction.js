import axios from "axios";

export const messageSend = async (data) => {
//   console.log(data);

  try {
    const response = await axios.post(
      "http://localhost:5000/send-message",
      data
    );
    console.log(response?.data?.messageData)
    return response?.data?.messageData;
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async (email) => {
//   console.log(email);
  const { fdEmail, myEmail } = email;
  
  try {
    const response = await axios.get(
      `http://localhost:5000/get-message/${fdEmail}/${myEmail}`, 
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};


export const ImageMessageSend = async(data) => {
// console.log(data)

try{
  const res = await axios.post('http://localhost:5000/image-message-send', data)
  console.log(res?.data?.messageData)
  return res?.data?.messageData;
  
}catch(error ){
  console.log(error)
}


}