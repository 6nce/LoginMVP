import {useState} from "react";
import {login, signup} from "../services/authService.jsx";

export default function LoginPage() {
    const [email, setEmail] = useState("");
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
                ? await login(email, password)
                : await signup(email, password);
            console.log(response.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false);
        }
    }
    
    return(
        <>
            <h1 className="text-center text-4xl font-bold text-blue-500 mt-10" >{mode === "login" ? "Login" : "Sign Up"}</h1>
            <form onSubmit={handleSubmit}   className="flex flex-col space-y-3 w-80 mx-auto mt-10">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded px-3 py-2"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded px-3 py-2"
                    required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {loading ? "Loading..." : mode === "login" ? "Login" : "Sign Up"}
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
                        Already have an account?{" "}
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
        </>
    );
}

