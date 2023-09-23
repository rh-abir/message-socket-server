const ActiveFriend = ({ user, setCurrentFriend }) => {
  return (
    <div
      onClick={() =>
        setCurrentFriend({
          email: user.userInfo?.email,
          name: user.userInfo.name,
          image: user.userInfo.image,
        })
      }
      className="active-friend"
    >
      <div className="image-active-icon">
        <div className="image">
          <img src={user?.userInfo?.image} alt="" />
          <div className="active-icon"></div>
        </div>
      </div>
    </div>
  );
};

export default ActiveFriend;
