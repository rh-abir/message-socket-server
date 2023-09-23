import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveUser } from "../api/auth";
import { AuthContext } from "../provider/AuthPorvider";

const Register = () => {
  const navigate = useNavigate();

  const { createUser, updateUSerProfile } = useContext(AuthContext);
  // console.log(user);

  const [state, setState] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [loadImage, setLoadImage] = useState();

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const fileHendle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }

    const reader = new FileReader();

    reader.onload = () => {
      setLoadImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const { userName, email, password, confirmPassword, image } = state;

    console.log(state);
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${"c60c31f11bc9fbfc3255c71c3908b8ee"}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData.data.display_url;
        // console.log(imageUrl);

        createUser(email, password)
          .then((result) => {
            console.log(result.user);
            updateUSerProfile(userName, imageUrl)
              .then(() => {
                saveUser(result.user);
                navigate("/");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      });
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
        </div>

        <div className="card-body">
          <form onSubmit={registerSubmit}>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                onChange={inputHandle}
                name="userName"
                value={state.userName}
                type="text"
                placeholder="user name"
                className="form-control"
                id="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                name="email"
                value={state.email}
                type="email"
                placeholder="email"
                className="form-control"
                id="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                name="password"
                value={state.password}
                type="password"
                placeholder="password"
                className="form-control"
                id="password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                onChange={inputHandle}
                name="confirmPassword"
                value={state.confirmPassword}
                type="password"
                placeholder="confirm Password"
                className="form-control"
                id="confirmPassword"
              />
            </div>

            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage ? <img src={loadImage} alt="" /> : ""}
                </div>

                <div className="file">
                  <label htmlFor="image">Upload Image</label>
                  <input
                    onChange={fileHendle}
                    name="image"
                    type="file"
                    className="form-control"
                    id="image"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <input type="submit" className="btn" value="Register" />
            </div>

            <div className="form-group">
              <span>
                <Link to="/login">Login Your Account</Link>{" "}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
