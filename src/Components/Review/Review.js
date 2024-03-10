import { Button } from '@mui/material';
import React, { useState } from 'react';

const InputForm = () => {
    const initialValue = { user: '', reason: '', location: '' }
    const [formData, setFormData] = useState(initialValue);
    const [submittedData, setSubmittedData] = useState([]);

    const isFormValid = formData.user && formData.reason && formData.location;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentTime = new Date().toLocaleTimeString();
        const newData = { ...formData, time: currentTime };
        setSubmittedData([...submittedData, newData]);
        setFormData(initialValue);
    };

    const handleDelete = (index) => {
        const updatedData = submittedData.filter((_, i) => i !== index);
        setSubmittedData(updatedData);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="user" className="block text-gray-700 text-sm font-bold mb-2">User:</label>
                                <input type="text" id="user" name="user" value={formData.user} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">Reason:</label>
                                <input type="text" id="reason" name="reason" value={formData.reason} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
                                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <button type="submit" disabled={!isFormValid} className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:shadow-outline ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                <div>
                    {submittedData.map((data, index) => (
                        <div key={index} className="bg-gray-200 rounded-md px-4 py-2 mb-4">
                            <h2 className="text-lg font-bold mb-2">Submitted Data {index + 1}:</h2>
                            <p>User: {data.user}</p>
                            <p>Reason: {data.reason}</p>
                            <p>Location: {data.location}</p>
                            <p>Time: {data.time}</p>
                            <Button variant="contained" onClick={() => handleDelete(index)}>
                                Delete
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InputForm;
