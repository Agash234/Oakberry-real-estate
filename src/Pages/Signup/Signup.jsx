import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../Component/Button/Button";
import { axiosinstance } from "../../Interceptor/Interceptor";
import "./Signup.css";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [con_password, setConPassword] = useState("");
  const [images, setImages] = useState(null);
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [agentCode, setAgentCode] = useState(""); // For agent registration
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const emailChange = (e) => setEmail(e.target.value);
  const nameChange = (e) => setUsername(e.target.value);
  const passwordChange = (e) => setPassword(e.target.value);
  const con_passwordChange = (e) => setConPassword(e.target.value);
  const handleAgentCodeChange = (e) => setAgentCode(e.target.value);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImages(selectedFile);
  };

  const uploadImage = async () => {
    if (!images) {
      throw new Error("Please upload an image.");
    }

    const formData = new FormData();
    formData.append("file", images);

    const response = await axios.post("http://localhost:8000/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.imageUrl;
  };

  const handlesignup = async () => {
    if (password !== con_password) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Upload image and get URL
      const uploadedImageUrl = await uploadImage();

      // Register user/agent
      const response = await axiosinstance.post("/auth/register", {
        username,
        email,
        password,
        role,
        agentCode: role === "agent" ? agentCode : null, // Send agentCode only for agents
        images: uploadedImageUrl,
      });

      setSuccess(response.data.message || "Registration successful!");
      navigate("/");
    } catch (err) {
      setError(err.response ? err.response.data.error : "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="parent_register">
      <div className="signup_content">
        <h1>
          <i className="fa-solid fa-cash-register fa-bounce"></i>
          <p>Join Our Club</p>
        </h1>
        <div className="all_details_signup">
          <div className="signup_input">
            <input
              type="text"
              id="name"
              placeholder=""
              required
              value={username}
              onChange={nameChange}
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="signup_input">
            <input
              type="email"
              id="email"
              placeholder=""
              required
              value={email}
              onChange={emailChange}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="signup_input">
            <input
              type="password"
              id="password"
              placeholder=""
              required
              value={password}
              onChange={passwordChange}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="signup_input">
            <input
              type="password"
              id="con_password"
              placeholder=" "
              required
              value={con_password}
              onChange={con_passwordChange}
            />
            <label htmlFor="con_password">Confirm Password</label>
          </div>

          <div className="signup_input">
            <input type="file" id="image" required onChange={handleFileChange} />
          </div>

          <div >
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              Register as User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="agent"
                checked={role === "agent"}
                onChange={() => setRole("agent")}
              />
              Register as Agent
            </label>
          </div>

          {role === "agent" && (
            <div >
              <input
                type="text"
                id="agentCode"
                placeholder="Agent Code"
                required
                value={agentCode}
                onChange={handleAgentCodeChange}
              />
            
            </div>
          )}

          <div className="signup_bt">
            <Button
              onClick={handlesignup}
              text={loading ? "Signing Up..." : "Signup"}
              disabled={loading}
            />
          </div>
          <p>
            If you have an account <Link to="/login">Click Here</Link>
          </p>
          <div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {success && <div style={{ color: "green" }}>{success}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;  