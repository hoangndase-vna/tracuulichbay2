
import React from 'react';
import { FlightData } from '../types';

interface ResultsTableProps {
  data: FlightData[];
  isLoading: boolean;
}

const THEAD_CLASSES = "sticky top-0 px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider bg-[#004a99]";

const ResultsTable: React.FC<ResultsTableProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#E8B82A]"></div>
        <span className="ml-4 text-lg">Loading Data...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-slate-800/50 border border-slate-700 rounded-lg">
        <h3 className="text-xl font-semibold text-white">No Results Found</h3>
        <p className="text-slate-400 mt-2">Try adjusting your search filters.</p>
      </div>
    );
  }

  const columns = [
    'Airlines', 'A.Reg', 'A.Type', 'Arr.No', 'Dep.No', 'Route', 
    'ETA', 'ETD', 'A-P', 'D-P', 'M.P for Arrival', 'M.P for Departure', 'Towing'
  ];

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg border border-slate-700">
        <div className="w-full overflow-x-auto max-h-[70vh]">
            <table className="min-w-full bg-slate-800">
                <thead className="bg-[#003876]">
                    <tr>
                        {columns.map(col => <th key={col} className={THEAD_CLASSES}>{col}</th>)}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                    {data.map((item, index) => (
                        <tr key={index} className="hover:bg-slate-700/50 transition-colors duration-150">
                            <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">{item.Airlines}</td>
                            <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">{item.AReg}</td>
                            <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">{item.AType}</td>
                            <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">{item.ArrNo}</td>
                            <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">{item.DepNo}</td>
                            <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">{item.Route}</td>
                            <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">{item.ETA}</td>
                            <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">{item.ETD}</td>
                            <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">{item.AP}</td>
                            <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">{item.DP}</td>
                            <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">{item.MPforArrival}</td>
                            <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">{item.MPforDeparture}</td>
                            <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">{item.Towing}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default ResultsTable;
