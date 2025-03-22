import Image from "next/image";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalEditProfile({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

    const handleSubmit = () => {
        alert('Profile updated!');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center text-black">
            <div className="flex bg-white rounded-lg p-6 shadow-lg relative">
                {/* <button 
                className="absolute top-2 right-3 font-bold text-xl text-gray-400 hover:text-gray-900"
                onClick={onClose}
                >
                ✕
                </button> */}
                
                <div className="flex flex-col w-200 p-2">
                    <div className="flex gap-10 items-center mb-4">
                        <h2 className="text-xl font-bold">EDIT MY PROFILE</h2>
                    </div>

                    <div className="flex items-center gap-6 w-full my-3">
                        <div className="flex flex-col justify-center">
                            <Image 
                                src="/images/image.jpg" 
                                alt="Profile Avatar" 
                                width={160} 
                                height={80} 
                                className="rounded-full"
                            />
                            <button className="text-blue-500 mt-2 underline">change profile</button>
                        </div>
                        
                        <div className="bg-gray-100 shadow-2xl p-5 rounded-lg flex-1">
                            <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg flex-1">
                                <div className="mb-3">
                                    <label className="text-gray-600 text-md">Username</label>
                                    <input
                                    type="text"
                                    name="username"
                                    className="w-full border rounded p-2 pl-3 mt-1"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="text-gray-600 text-md">Email</label>
                                    <input
                                    type="email"
                                    name="email"
                                    className="w-full border rounded p-2 pl-3 mt-1"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="text-gray-600 text-md">New Password</label>
                                    <input
                                    type="password"
                                    name="newPassword"
                                    className="w-full border rounded p-2 pl-3 mt-1"
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label className="text-gray-600 text-md">Confirm New Password</label>
                                    <input
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full border rounded p-2 pl-3 mt-1"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="w-24 bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md" 
                            onClick={onClose}>
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
