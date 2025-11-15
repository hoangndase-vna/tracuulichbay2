
export interface FlightData {
  Airlines: string;
  AReg: string;
  AType: string;
  ArrNo: string;
  DepNo: string;
  Route: string;
  ETA: string;
  ETD: string;
  AP: string;
  DP: string;
  MPforArrival: string;
  MPforDeparture: string;
  Towing: string;
}

export interface SearchFilters {
  airlines: string;
  aReg: string;
  arrNo: string;
  depNo: string;
  employeeId: string;
}
