import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { getManagers, createManager, deleteUser, updateUser } from "../api/users";
import UserForm from "../components/users/form";
import UserTable from "../components/users/table";
import Alert from "../components/alert";

const Managers = () => {
    const { user } = useAuth();
    const [managers, setManager] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    const initialManagerState = {
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        birthDate: new Date().toISOString().split('T')[0],
    };

    const [newManager, setNewManager] = useState(initialManagerState);
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchManagers = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getManagers(1, 10);
                setManager(data.users);
            } catch (error) {
                setError("Failed to fetch managers. Please try again.");
                console.error("Error fetching managers:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchManagers();
    }
    , []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewManager({ ...newManager, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
            if (editingId) {
                await updateUser(editingId, newManager);
                setSuccess("Manager updated successfully.");
            } else {
                await createManager(newManager);
                setSuccess("Manager created successfully.");
            }
            setNewManager(initialManagerState);
            setEditingId(null);
            const data = await getManagers(1, 10);
            setManager(data.users);
        } catch (error) {
            setError("Failed to save manager. Please try again.");
            console.error("Error saving manager:", error);
        } finally {
            setIsLoading(false);
            setShowForm(false);
        }
    };
    const handleEdit = (manager) => {
        setNewManager(manager);
        setEditingId(manager.id);
        setShowForm(true);
    };
    const handleDelete = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            await deleteUser(id);
            setSuccess("Manager deleted successfully.");
            const data = await getManagers(1, 10);
            setManager(data.users);
        } catch (error) {
            setError("Failed to delete manager. Please try again.");
            console.error("Error deleting manager:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Managers</h1>
            {error && <Alert message={error} type="error" />}
            {success && <Alert message={success} type="success" />}
            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                {showForm ? "Cancel" : "Add Manager"}
            </button>
            {showForm && (
                <UserForm
                    user={newManager}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            )}
            <UserTable
                users={managers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isLoading={isLoading}
            />
        </div>
    );
}

export default Managers;
