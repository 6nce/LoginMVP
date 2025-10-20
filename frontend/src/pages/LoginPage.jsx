import {useState} from "react";
import {login, signup} from "../services/authService.jsx";
import {useNavigate} from "react-router-dom"
import {useContext} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import PageLayout from "../components/PageLayout.jsx"

export default function LoginPage() {
    const { setEmail, setToken} = useAuth();
    const navigate = useNavigate();
    const [email, setInputEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState("login");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
            const response =
                mode === "login"
                ? await login(email, password) : await signup(email, password);

            //Faux delay to simulate load times.
            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (mode === "signup") {
                setMode("login");
                setEmail("");
                setPassword("");
                setError("");
                alert("Account Created! Please log in.");
            } else {
                setEmail(email);
                setToken(response.data.testToken);
                navigate("/mfa");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            await new Promise((resolve) => setTimeout(resolve, 500));
            setLoading(false)
        }
    }
    
    return(
        <PageLayout title="Welcome to Alkira">
            {mode === "login" ? (
                <p className="text-sm">Please log in below</p>) : (
                <p className="text-sm">Please fill out the form below</p>
            )}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-3 w-80 mx-auto mt-4"
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setInputEmail(e.target.value)}
                    disabled={loading}
                    className="border rounded px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="border rounded px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                />

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className={`relative inline-flex justify-center items-center px-6 py-3 text-white font-semibold rounded-lg overflow-hidden transition-all duration-500 ease-out group ${
                        loading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-[#3B45EA] hover:bg-blue-700"
                    }`}
                >
                    <span
                        className="absolute left-0 top-0 h-full w-0 bg-[#76DDAC] transition-all duration-500 ease-out group-hover:w-full"></span>

                    <span className="relative z-10 flex items-center">
            {loading ? (
                <>
                    <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
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
                    Checking...
                </>
            ) : mode === "login" ? (
                "Login"
            ) : (
                "Sign Up"
            )}
          </span>
                </button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-600">
                {mode === "login" ? (
                    <>
                        Not Registered? {" "}
                        <button
                            type="button"
                            onClick={() => setMode("signup")}
                            className="text-blue-500 underline"
                        >
                            Sign Up
                        </button>
                    </>
                ) : (
                    <>
                        Already have an account? {" "}
                        <button
                            type="button"
                            onClick={() => setMode("login")}
                            className="text-blue-500 underline"
                        >
                            Login
                        </button>
                    </>
                )}
            </p>
        </PageLayout>
    );
}

