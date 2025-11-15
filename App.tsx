
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchAndParseData } from './services/dataService';
import { FlightData, SearchFilters } from './types';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ResultsTable from './components/ResultsTable';

const App: React.FC = () => {
  const [allData, setAllData] = useState<FlightData[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    airlines: '',
    aReg: '',
    arrNo: '',
    depNo: '',
    employeeId: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchAndParseData();
        setAllData(data);
      } catch (err) {
        setError('Failed to fetch or parse data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFilterChange = useCallback((filterName: keyof SearchFilters, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      airlines: '',
      aReg: '',
      arrNo: '',
      depNo: '',
      employeeId: '',
    });
  }, []);

  const filteredData = useMemo(() => {
    return allData.filter(item => {
      const filterAirlines = filters.airlines.trim().toLowerCase();
      const filterAReg = filters.aReg.trim().toLowerCase();
      const filterArrNo = filters.arrNo.trim().toLowerCase();
      const filterDepNo = filters.depNo.trim().toLowerCase();
      const filterEmployeeId = filters.employeeId.trim().toLowerCase();

      // Rule: Airlines - must start with the filter value.
      const airlinesMatch = filterAirlines ? item.Airlines.toLowerCase().startsWith(filterAirlines) : true;
      
      // Rule: A.Reg - must contain the filter value, after removing the "VN-" prefix from the source.
      const aRegSource = item.AReg.toLowerCase().replace(/^vn-/, '');
      const aRegMatch = filterAReg ? aRegSource.includes(filterAReg) : true;
      
      // Rule: Arr.No - must start with the filter value.
      const arrNoMatch = filterArrNo ? item.ArrNo.trim().toLowerCase().startsWith(filterArrNo) : true;
      
      // Rule: Dep.No - must start with the filter value.
      const depNoMatch = filterDepNo ? item.DepNo.trim().toLowerCase().startsWith(filterDepNo) : true;
      
      // Rule: Employee ID - must be contained in either the arrival or departure MP fields.
      const employeeIdMatch = filterEmployeeId ?
        item.MPforArrival.toLowerCase().includes(filterEmployeeId) ||
        item.MPforDeparture.toLowerCase().includes(filterEmployeeId)
        : true;

      return airlinesMatch && aRegMatch && arrNoMatch && depNoMatch && employeeIdMatch;
    });
  }, [allData, filters]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <SearchForm 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onReset={resetFilters}
        />

        {error && (
          <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-center">
            <p className="font-bold">An Error Occurred</p>
            <p>{error}</p>
          </div>
        )}
        
        <div className="mt-8">
          <ResultsTable data={filteredData} isLoading={isLoading} />
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
          <p>Flight Data Lookup Tool. Data is sourced from a public Google Sheet.</p>
      </footer>
    </div>
  );
};

export default App;
