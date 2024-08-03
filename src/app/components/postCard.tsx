import React from 'react';

interface CardProps {
  userId: number;
  id: number;
  title: string;
  body: string;
  innerRef?: React.Ref<HTMLParagraphElement>;
}

const InfoCard = ({ userId, id, title, body,innerRef,...props }:CardProps) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">User ID: {userId}</div>
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Post ID: {id}</div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{title}</h1>
          <p className="mt-2 text-gray-500">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;