import React from "react";

interface CardProps {
  title: string;
}

export const Card: React.FC<CardProps> = ({ title }) => {
  return (
    <div
      className="
      bg-white 
      p-4 
      rounded-lg 
      shadow-md 
      border 
      border-gray-200
    "
    >
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

      <p className="mt-2 text-sm text-gray-500">Conteúdo a ser adicionado...</p>
    </div>
  );
};
