import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			if (!email.includes('@')) {
				setErrors(["Email must contain @ symbol"])
				return
			}
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		}
		else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<h1 className="sign-up-title">Sign Up</h1>
			<form onSubmit={handleSubmit} className='sign-up-form' noValidate>
				<ul>
					{errors.map((error, idx) => (
						<div key={idx} className="sign-up-err-message">{error}</div>
					))}
				</ul>
				<label className="form-label">
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						style={{ width: "100%", fontSize: "20px" }}
					/>
				</label>
				<label className="form-label">
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						style={{ width: "100%", fontSize: "20px" }}
					/>
				</label>
				<label className="form-label">
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						style={{ width: "100%", fontSize: "20px" }}
					/>
				</label>
				<label className="form-label">
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						style={{ width: "100%", fontSize: "20px" }}
					/>
				</label>
				<button type="submit" className="sign-up-button">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
