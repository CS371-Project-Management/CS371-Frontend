"use client";

import { useState } from "react";
import ReportFail from "@/components/modals/report/ReportFail";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalDeleteClassroom({ isOpen, onClose }: ModalProps) {
  const [showFail, setShowFail] = useState(false);

  if (!isOpen) return null;

  const handleDelete = () => {
    const deleteSuccess = Math.random() > 0.5;
    if (!deleteSuccess) {
      setShowFail(true);
    } else {
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm text-black">
        <div className="flex relative flex-col gap-3 p-8 bg-white rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="text-lg font-bold">Do you want to delete this classroom?</p>
          
          <div className="flex justify-around mt-5">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={handleDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      <ReportFail
        isOpen={showFail}
        onClose={() => setShowFail(false)}
        title="Failed to delete classroom."
        press="OK"
      />
    </>
  );
}
