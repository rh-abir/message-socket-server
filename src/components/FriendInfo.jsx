import { BsChevronDown } from "react-icons/bs";

const FriendInfo = ({ currentFriend, activeUsers }) => {
  return (
    <div className="friend-info">
      <input type="checkbox" id="gallery" />
      <div className="image-name">
        <div className="image">
          <img src={currentFriend?.image} alt="" />
        </div>

        {activeUsers &&
        activeUsers.length > 0 &&
        activeUsers.some((u) => u.userEmail === currentFriend?.email) ? (
          <div className="active-user">Active</div>
        ) : (
          ""
        )}

        <div className="name">
          <h4>{currentFriend?.name}</h4>
        </div>
      </div>

      <div className="others">
        <div className="custom-chat">
          <h3>Coustomise Chat</h3>
          <BsChevronDown />
        </div>

        <div className="privacy">
          <h3>Privacy and Support</h3>
          <BsChevronDown />
        </div>

        <div className="media">
          <h3>Shared Media</h3>
          <label htmlFor="gallery">
            <BsChevronDown />
          </label>
        </div>

        <div className="gallery">
          <img src="https://i.ibb.co/ZHYXD3r/10782719-19197274.jpg" alt="" />
          <img src="https://i.ibb.co/ZHYXD3r/10782719-19197274.jpg" alt="" />
          <img src="https://i.ibb.co/ZHYXD3r/10782719-19197274.jpg" alt="" />
          <img src="https://i.ibb.co/ZHYXD3r/10782719-19197274.jpg" alt="" />
          <img src="https://i.ibb.co/ZHYXD3r/10782719-19197274.jpg" alt="" />
          <img src="https://i.ibb.co/ZHYXD3r/10782719-19197274.jpg" alt="" />
          <img src="https://i.ibb.co/ZHYXD3r/10782719-19197274.jpg" alt="" />
          <img src="https://i.ibb.co/ZHYXD3r/10782719-19197274.jpg" alt="" />
          <img src="https://i.ibb.co/ZHYXD3r/10782719-19197274.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default FriendInfo;
