
import React from 'react';
import { SearchFilters } from '../types';

interface SearchFormProps {
  filters: SearchFilters;
  onFilterChange: (filterName: keyof SearchFilters, value: string) => void;
  onReset: () => void;
}

const SearchInput: React.FC<{
    id: keyof SearchFilters;
    label: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, label, value, placeholder, onChange }) => (
    <div className="flex flex-col">
        <label htmlFor={id} className="mb-1.5 text-sm font-medium text-gray-300">{label}</label>
        <input
            id={id}
            name={id}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#E8B82A] focus:border-[#E8B82A] focus:outline-none transition duration-200"
        />
    </div>
);


const SearchForm: React.FC<SearchFormProps> = ({ filters, onFilterChange, onReset }) => {
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onFilterChange(name as keyof SearchFilters, value);
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700 p-4 md:p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <SearchInput id="airlines" label="Airlines" value={filters.airlines} onChange={handleInputChange} placeholder="e.g., VN, QR..." />
                <SearchInput id="aReg" label="A.Reg (Tên tàu)" value={filters.aReg} onChange={handleInputChange} placeholder="e.g., A688" />
                <SearchInput id="arrNo" label="Arr.No" value={filters.arrNo} onChange={handleInputChange} placeholder="Flight number" />
                <SearchInput id="depNo" label="Dep.No" value={filters.depNo} onChange={handleInputChange} placeholder="Flight number" />
                <SearchInput id="employeeId" label="Mã nhân viên" value={filters.employeeId} onChange={handleInputChange} placeholder="e.g., VAE00076" />
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    onClick={onReset}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-md transition duration-200 text-sm"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default SearchForm;
