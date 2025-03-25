import { useState } from "react";
import Image from "next/image";
import ReportSuccess from "../report/ReportSuccess";
import ReportFail from "../report/ReportFail";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalEditProfile({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.oldPassword) newErrors.oldPassword = "Old password is required";
        if (!formData.newPassword) newErrors.newPassword = "New password is required";
        if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setShowSuccess(true);
        } else {
            setShowFailure(true);
        }
    };

    return (
        <div className="fixed inset-0 z-1 flex items-center justify-center text-black">
            <div className="flex bg-white rounded-lg p-6 shadow-lg relative w-250">
                <div className="flex flex-col w-full p-2">
                    <div className="flex gap-10 items-center mb-4">
                        <h2 className="text-xl font-bold">EDIT MY PROFILE</h2>
                    </div>

                    <div className="flex items-center gap-6 w-full my-3">
                        <div className="flex flex-col justify-center items-center">
                            <Image 
                                src="/images/image.jpg" 
                                alt="Profile Avatar" 
                                width={100} 
                                height={100} 
                                className="rounded-full"
                            />
                            <button className="text-blue-500 mt-2 underline">Change Profile</button>
                        </div>
                        
                        <div className="bg-gray-100 shadow-2xl p-5 rounded-lg flex-1 w-full">
                            <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg w-full">
                                <div className="mb-3">
                                    <label className="text-gray-600 text-md">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="w-full border rounded p-2 mt-1"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                                </div>

                                <div className="mb-3">
                                    <label className="text-gray-600 text-md">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full border rounded p-2 mt-1"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>

                                <div className="mb-3">
                                    <label className="text-gray-600 text-md">Old Password</label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        className="w-full border rounded p-2 mt-1"
                                        value={formData.oldPassword}
                                        onChange={handleChange}
                                    />
                                    {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword}</p>}
                                </div>

                                <div className="mb-3">
                                    <label className="text-gray-600 text-md">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        className="w-full border rounded p-2 mt-1"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                    />
                                    {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="text-gray-600 text-md">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="w-full border rounded p-2 mt-1"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                                </div>
                                
                                <div className="flex justify-between mt-4">
                                    <button className="w-24 bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md" 
                                        onClick={onClose}>
                                        Cancel
                                    </button>

                                    <button type="submit" className="w-24 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ReportSuccess isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Edit profile is success." press="OK"></ReportSuccess>
            <ReportFail isOpen={showFailure} onClose={() => setShowFailure(false)} title="Edit profile is failed" press="OK"></ReportFail>
        </div>
    );
}
