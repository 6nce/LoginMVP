import {useState, useEffect} from 'react'
import {useAuth} from "../context/AuthContext.jsx";
import axios from "axios";
import PageLayout from "../components/PageLayout"

export default function UserDashboard() {
    const { email, role } = useAuth();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if(role === "admin") {
            axios
                .get(`http://localhost:8080/users?role=${role}`)
                .then((res) => setUsers(res.data))
                .catch((err) => setError(err.response?.data?.error || "Error fetching users"));
        }
    }, [role]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/users/${id}?role=${role}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    if(role !== "admin") {
        return (
        <PageLayout title="Alkira User Dashboard">
        <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-4">{email}</h3>
            <p>MFA Verification Confirmed.</p>
            <p>User Access Level: {role}</p>
        </div>
        </PageLayout>
        )
    }

        return (
            <PageLayout title="Alkira Admin Dashboard">
            <div className="flex flex-col items-center justify-center ">
                <h3 className="text-xl font-bold mb-4">{email}</h3>
                <p>MFA Verification Confirmed.</p>
                <p>User Access Level: {role}</p>

                <div className="flex flex-col items-center mt-10">
                    <h1 className="text-2xl font-bold mb-4">Admin Control Panel</h1>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    {users.map((user) => (
                        <div key={user.id} className="border rounded p-3 mb-2 w-80 flex justify-between">
                            <span>{user.email}</span>
                            <span className="text-gray-500">{user.role}</span>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="bg-red-500 hover:bg-red-800 text-white px-3 py-1 rounded">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            </PageLayout>
        )
}