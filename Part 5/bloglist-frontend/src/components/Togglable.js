import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false);

  const isVisible = { display: visible ? "block" : "none" };
  const isHidden = { display: !visible ? "block" : "none" };

  useImperativeHandle(ref, () => {
    return {
        toggaleVisibillity
    }
  })

  const toggaleVisibillity = () => setVisible(!visible);
  return (
    <div>
      <div style={isHidden}>
        <button
          onClick={toggaleVisibillity}
          style={{ color: "blue", textAlign: "center", borderRadius: "8px" }}
        >
          {buttonLabel}
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
});

export default Togglable;