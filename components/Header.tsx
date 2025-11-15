
import React from 'react';
import LotusIcon from './icons/LotusIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-[#003876] p-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex items-center gap-3 md:gap-4">
        <LotusIcon className="h-9 w-9 md:h-10 md:w-10 text-[#E8B82A]" />
        <h1 className="text-xl md:text-3xl font-bold text-white tracking-wide">
          Flight Operations Lookup
        </h1>
      </div>
    </header>
  );
};

export default Header;
