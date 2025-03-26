"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

interface CardProps {
  image: string;
  title: string;
  description: string;
}

export default function CopyCard({ image, title, description }: CardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(title).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-96 h-96 bg-white shadow-xl rounded-lg overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold line-clamp-1 mr-2">{title}</h3>
          <Copy 
            className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black"
            onClick={handleCopy}
          />
        </div>

        {copied && (
          <p className="flex justify-end text-green-600 text-sm mb-2">Copied!</p>
        )}

        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>
    </div>
  );
}
