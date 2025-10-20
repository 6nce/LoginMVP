import {useState, useEffect} from 'react'
import axios from "axios"
import { useAuth } from '../context/AuthContext.jsx';
import {useNavigate} from "react-router-dom"
import PageLayout from "../components/PageLayout"


export default function MfaPage() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [tokenVisible, setTokenVisible] = useState(false);
    const { email, setIsLoggedIn, setRole, token } = useAuth();

    console.log(token);

    const handleVerification = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const response = await axios.post("https://loginmvp-backend.onrender.com/mfa", {
                email,
                token: otp
            });

            await new Promise((resolve) => setTimeout(resolve, 2000));


            console.log("MFA Verified: ", response.data);
            setRole(response.data.user.role);
            navigate("/dashboard")
            setIsLoggedIn(true);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Invalid code, please try again.")
        } finally {
            setLoading(false);
        }
    };
    return (
        <PageLayout title="Enter MFA Code">
            <div className="flex flex-col items-center justify-center space-y-8">
                <div className="flex flex-col items-center">

                    <form onSubmit={handleVerification} className="flex flex-col space-y-3 w-80">
                        <input
                            type="text"
                            value={otp}
                            placeholder="Enter 6-digit code"
                            onChange={(e) => setOtp(e.target.value)}
                            className="border rounded px-3 py-2 text-center"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg overflow-hidden bg-[#3B45EA] group"
                        >
                            <span
                                className="absolute left-0 top-0 h-full w-0 bg-[#76DDAC] transition-all duration-500 ease-out group-hover:w-full"></span>
                            <span className="relative z-10 flex items-center space-x-2">
                                {loading && (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                )}
                                                            <span>{loading ? "Verifying..." : "Verify Code"}</span>
                              </span>
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-3">{error}</p>}
                    {success && <p className="text-green-500 mt-3">MFA Verified. Welcome {email}</p>}
                </div>

                <div className="flex flex-col items-center mt-10 space-y-4">
                    <h2 className="text-xl font-semibold">Multi-Factor Authentication Simulator</h2>
                    <p className="text-xs">Code Valid for 30 Seconds</p>
                    <button
                        onClick={() => setTokenVisible(!tokenVisible)}
                        className="bg-[#DEED7E] hover:bg-[#F4FFAB] text-black px-4 py-2 rounded"
                    >
                        {tokenVisible ? "Hide Simulated MFA Code" : "Show Simulated MFA Code"}
                    </button>

                    {tokenVisible && (
                        <div className="mt-2 p-3 rounded">
                            <p className="text-xl font-mono font-bold">{token}</p>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}
