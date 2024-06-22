export interface Weather {
  temperature: number;
  description: string;
  icon: string;
  city: string;
  country: string;
}

export interface Forecast {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

export interface City {
    label:string,
    value:string,
  latitude: number;
  longitude: number;
}
