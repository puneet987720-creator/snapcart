import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyEmail } from "../../services/authorization";

export function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState("Verifying...");

const verify = async () => {
      try {
        await verifyEmail(token);
        setIsVerified("Email verified successfully!");
      } catch (error) {
        console.error('Error verifying email:', error);
        setIsVerified("Failed to verify email.");
      }
    };

  useEffect(() => {
    verify();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card bg-base-100 w-[28rem] shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Verify Your Email</h2>
          <p>{isVerified}</p>
        </div>
      </div>
    </div>
  );
};
