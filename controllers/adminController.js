const {getPool} = require("../config/db");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const pool = getPool();
  try {
    const [users] = await pool.query("SELECT id, name, email, role, created_at FROM users");
    res.status(200).json({ message: "✅ Admin fetched all users", users });
  } catch (err) {
    console.error(" Get all users error (Admin):", err);
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

const getUserById = async (req, res) => {
  const pool = getPool();
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ message: "Invalid user ID" });

    const [rows] = await pool.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Get user by ID error:", err);
    res.status(500).json({ message: "Failed to fetch user", error: err.message });
  }
};

// Actualizar cualquier usuario (incluye cambio de rol)
const updateUserAsAdmin = async (req, res) => {
  const pool = getPool();
  try {
    const userId = parseInt(req.params.id);
    const { name, email, password, role } = req.body;

    if (isNaN(userId)) return res.status(400).json({ message: "Invalid user ID" });

    const updateFields = [];
    const values = [];
    if (name) {
      updateFields.push("name = ?");
      values.push(name);
    }
    if (email) {
      updateFields.push("email = ?");
      values.push(email);
    }
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateFields.push("password = ?");
      values.push(hashed);
    }
    if (role) {
      updateFields.push("role = ?");
      values.push(role);
    }
    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }
    values.push(userId);
    const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;

    const [result] = await pool.query(query, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found or no changes made" });
    }
    res.status(200).json({ message: "User updated successfully by admin" });
  } catch (err) {
    console.error(" Admin update user error:", err);
    res.status(500).json({ message: "Failed to update user", error: err.message });
  }
};

const deleteUserAsAdmin = async (req, res) => {
  const pool = getPool();
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ message: "Invalid user ID" });

    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
};
module.exports = {getAllUsers, getUserById, updateUserAsAdmin,deleteUserAsAdmin};
