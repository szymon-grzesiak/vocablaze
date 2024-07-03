import React from 'react';

interface BoxProps {
  height: string;
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ height, children }) => {
  return (
    <div className={`relative h-${height}`}>
      <span className="absolute top-0 left-0 w-full h-full mt-0.5 ml-0.5 bg-black rounded-lg" />
      <div className="relative h-full p-5 bg-white border-1 border-black rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Box;
