import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { VerifyUser, resendOtp, sendOtpforPassword } from "../utils/apiFunction";
import "./Verify.css";

const VerifyResetOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const email = location.state?.email;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errorMsg, setErrorMsg] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  useEffect(() => {
    if (timer === 0) {
      setIsResendDisabled(false);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      setErrorMsg("Enter 6 digit OTP");
      return;
    }

    try {
      await VerifyUser(email, code);

      // 👉 Go to password change page
      navigate("/set-password", { state: { email } });

    } catch (e) {
      setErrorMsg("Invalid OTP ❌");
    }
  };

  const handleResendOtp = async () => {
    try {
      await sendOtpforPassword(email);

      setOtp(new Array(6).fill(""));
      inputsRef.current[0]?.focus();

      setTimer(20);
      setIsResendDisabled(true);

    } catch {
      setErrorMsg("Failed to resend OTP");
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-overlay">
        <div className="verify-card">
          <h2>Verify OTP</h2>

          <p>OTP sent to <strong>{email}</strong></p>

          <div className="otp-input-group">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="otp-input-box"
              />
            ))}
          </div>

          {isResendDisabled ? (
            <p>Resend in {timer}s</p>
          ) : (
            <button onClick={handleResendOtp}>Resend OTP</button>
          )}

          {errorMsg && <div className="alert-error">{errorMsg}</div>}

          <button className="verify-btn" onClick={handleVerify}>
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyResetOtp;