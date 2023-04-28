import { useState } from "react";

const Togglable = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const isVisible = { display: visible ? "block" : "none" };
  const isHidden = { display: !visible ? "block" : "none" };

  const toggaleVisibillity = () => setVisible(!visible);
  return (
    <div>
      <div style={isHidden}>
        <button
          onClick={toggaleVisibillity}
          style={{ color: "blue", textAlign: "center", borderRadius: "8px" }}
        >
          New Blog
        </button>
      </div>
      <div style={isVisible}>
        {children}
        <button
          onClick={toggaleVisibillity}
          style={{ color: "blue", textAlign: "center", borderRadius: "8px" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Togglable;