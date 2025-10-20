import {testUsers} from "../utils/testUsers.js"

export async function getAllUsersController(req, res) {
    const { role } = req.query;
    if (role !== "admin") {
        return res.status(403).json({ error: "Unauthorized" });
    }
    return res.json(testUsers);
}

export function deleteUserController(req, res) {
    const { role } = req.query;
    const userId = parseInt(req.params.id);
    if (role !== "admin") {
        return res.status(403).json({ error: "Unauthorized" });
    }
    const index = testUsers.findIndex(u => u.id === userId);
    if (index === -1) return res.status(404).json({ error: "User not found" });
    testUsers.splice(index, 1);
    return res.json({ message: "User deleted" });
}