import api from './index';

export const getAllUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export const getUserById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}   

export const createVoter = async (userData) => {
    try {
        const response = await api.post('/users/voter', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export const getVoters = async (page, limit) => {
    try {
        const response = await api.get('/users/voters', {
            params: {
                page,
                limit,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching voters:', error);
        throw error;
    }
}

export const createManager = async (userData) => {
    try {
        const response = await api.post('/users/manager', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export const getManagers = async (page, limit) => {
    try {
        const response = await api.get('/users/managers', {
            params: {
                page,
                limit,
            },
        }); 
        return response.data;
    } catch (error) {
        console.error('Error fetching managers:', error);
        throw error;
    }
}

export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}