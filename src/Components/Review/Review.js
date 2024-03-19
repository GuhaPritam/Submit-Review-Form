import { Button } from '@mui/material';
import React, { useState } from 'react';

const InputForm = () => {
    const initialValue = { user: '', reason: '', location: '' };
    const [formData, setFormData] = useState(initialValue);
    const [submittedData, setSubmittedData] = useState([]);
    const [cancelData, setCancelData] = useState(null)

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
        const newData = { ...formData, time: currentTime, number: submittedData.length + 1 };
        setSubmittedData([...submittedData, newData]);
        setFormData(initialValue);
    };

    const handleDelete = (index) => {
        const updatedData = submittedData.filter((_, i) => i !== index);
        setSubmittedData(updatedData);
    };

    const handleEdit = (index) => {
        const updatedData = [...submittedData];
        updatedData[index].editing = true;
        setCancelData({ ...updatedData[index] });
        setSubmittedData(updatedData);
        console.log(updatedData)
    };

    const handleSave = (index) => {
        const updatedData = [...submittedData];
        updatedData[index].editing = false;
        setSubmittedData(updatedData);
    };

    const handleCancel = (index) => {
        const updatedData = [...submittedData];
        console.log(cancelData)
        if (cancelData) {
            updatedData[index] = cancelData;
            setCancelData(null);
        }
        updatedData[index].editing = false;
        setSubmittedData(updatedData);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedData = [...submittedData];
        updatedData[index][name] = value;
        setSubmittedData(updatedData);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">User:</label>
                                <input type="text" name="user" value={formData.user} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Reason:</label>
                                <input type="text" name="reason" value={formData.reason} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <button type="submit" disabled={!isFormValid} className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:shadow-outline ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                <div className="overflow-auto" style={{ maxHeight: "400px" }}>
                    {submittedData.map((data, index) => (
                        <div key={index} className="bg-gray-200 rounded-md px-4 py-2 mb-4">
                            <h2 className="text-lg font-bold mb-2">Submitted Data {data.number}:</h2>
                            {data.editing ? (
                                <>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">User:</label>
                                        <input type="text" name="user" value={data.user} onChange={(e) => handleInputChange(e, index)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Reason:</label>
                                        <input type="text" name="reason" value={data.reason} onChange={(e) => handleInputChange(e, index)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
                                        <input type="text" name="location" value={data.location} onChange={(e) => handleInputChange(e, index)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                                    </div>
                                    <div className='flex space-x-4'>
                                        <Button variant="contained" onClick={() => handleSave(index)}>
                                            Save
                                        </Button>
                                        <Button variant="contained" onClick={() => handleCancel(index)}>
                                            Cancel
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>User: {data.user}</p>
                                    <p>Reason: {data.reason}</p>
                                    <p>Location: {data.location}</p>
                                    <Button variant="contained" onClick={() => handleEdit(index)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" onClick={() => handleDelete(index)}>
                                        Delete
                                    </Button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InputForm;
