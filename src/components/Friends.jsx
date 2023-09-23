const Friends = ({ friend }) => {
  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={friend.image} alt="" />
        </div>
      </div>
      <div className="friend-name">
        <h4>{friend.name}</h4>
      </div>
    </div>
  );
};

export default Friends;
