import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { getVoters, createVoter, deleteUser, updateUser } from "../api/users";
import UserForm from "../components/users/form";
import UserTable from "../components/users/table";
import Alert from "../components/alert";

const Voters = () => {
  const { user } = useAuth();
  const [voters, setVoters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const initialVoterState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    birthDate: new Date().toISOString().split('T')[0],
  };

  const [newVoter, setNewVoter] = useState(initialVoterState);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchVoters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getVoters(1, 10);
        setVoters(data.users);
      } catch (error) {
        setError("Failed to fetch voters. Please try again.");
        console.error("Error fetching voters:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVoters();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVoter({ ...newVoter, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (editingId) {
        const updatedVoter = await updateUser(editingId, newVoter);
        setVoters(voters.map(voter => voter.id === editingId ? updatedVoter : voter));
        setSuccess("Voter updated successfully!");
      } else {
        const createdVoter = await createVoter(newVoter);
        setVoters([...voters, createdVoter]);
        setSuccess("Voter added successfully!");
      }
      setNewVoter(initialVoterState);
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
      console.error("Error saving voter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this voter?")) return;
    
    setIsLoading(true);
    setError(null);
    try {
      await deleteUser(id);
      setVoters(voters.filter(voter => voter.id !== id));
      setSuccess("Voter deleted successfully!");
    } catch (error) {
      setError("Failed to delete voter. Please try again.");
      console.error("Error deleting voter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingId(null);
    setNewVoter(initialVoterState);
    setShowForm(true);
  };

  const handleEdit = (voter) => {
    setEditingId(voter.id);
    setNewVoter({
      name: voter.name,
      email: voter.email,
      phone: voter.phone,
      address: voter.address,
      gender: voter.gender,
      birthDate: voter.birthDate.split('T')[0],
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setNewVoter(initialVoterState);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Voter Management</h1>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Voter
        </button>
      </div>
      
      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}
      {success && (
        <Alert type="success" message={success} onClose={() => setSuccess(null)} />
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Voter List</h2>
        <UserTable
          users={voters}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <UserForm
              user={newVoter}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isEditing={!!editingId}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Voters;