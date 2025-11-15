import { FlightData } from '../types';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR-HZuPTZnCxLYYc3KdeggM3ABzePpddPbwFYPpRIdGEEW5wtbN0b423Y4xBtW809vAwPUkckRrnGJm/pub?output=csv';

export const fetchAndParseData = async (): Promise<FlightData[]> => {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    const lines = csvText.split('\n').map(line => line.trim());

    // Skip header rows; data starts from the 3rd line (index 2)
    const dataRows = lines.slice(2);
    
    const parsedData: FlightData[] = [];

    for (const row of dataRows) {
      if (!row) continue; // Skip empty lines

      // Simple CSV split by comma. This assumes no commas within fields.
      const cells = row.split(',');

      if (cells.length < 13) continue; // Ensure row has enough columns

      const rowData: FlightData = {
        Airlines: cells[0]?.trim() ?? '',
        AReg: cells[1]?.trim() ?? '',
        AType: cells[2]?.trim() ?? '',
        ArrNo: cells[3]?.trim() ?? '',
        DepNo: cells[4]?.trim() ?? '',
        Route: cells[5]?.trim() ?? '',
        ETA: cells[6]?.trim() ?? '',
        ETD: cells[7]?.trim() ?? '',
        AP: cells[8]?.trim() ?? '',
        DP: cells[9]?.trim() ?? '',
        MPforArrival: cells[10]?.trim() ?? '',
        MPforDeparture: cells[11]?.trim() ?? '',
        Towing: cells[12]?.trim() ?? '',
      };
      
      // Add only if the row contains some data and is not completely empty
      if (Object.values(rowData).some(val => val && val.trim() !== '')) {
          parsedData.push(rowData);
      }
    }
    
    return parsedData;
  } catch (error) {
    console.error("Failed to fetch and parse spreadsheet data:", error);
    throw error;
  }
};
