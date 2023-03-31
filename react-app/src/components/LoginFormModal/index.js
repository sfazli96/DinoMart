import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <>
      <h1 className="log-in-title">Log In</h1>
      <div className="login-modal">
        <form onSubmit={handleSubmit} className="login-form">
          <ul>
            {errors.map((error, idx) => (
              <div className='log-in-error-message' key={idx}>{error}</div>
            ))}
          </ul>
          <label className="form-label2">
            <span>Email</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              defaultValue="Enter your email here!"
              required
              style={{ width: "100%", fontSize: "20px" }}
            />
          </label>
          <label className="form-label2">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", fontSize: "20px" }}
            />
          </label>
          <button className="submit-button" type="submit">
            Log In
          </button>
        </form>
      <button className="DemoUserButton"onClick={() => dispatch(login("demo@aa.io", "password")).then(() => closeModal())}>Demo User</button>
      </div>
    </>
  );
}

export default LoginFormModal;
