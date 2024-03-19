export interface itemProp {
  id: number;
  airline: string;
  arrivalTime: string;
  departureTime: string;
  origin: string;
  duration: string;
  destination: string;
  seatsAvailable: number;
  price: number;
}

export interface itemDataProp {
  item: itemProp;
}
