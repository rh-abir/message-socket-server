import React, { useContext } from "react";
import { AuthContext } from "./provider/AuthPorvider";

const App = () => {
  const { user } = useContext(AuthContext);

  console.log(user);
  return (
    <div>
      <h2>This is app</h2>
    </div>
  );
};

export default App;
