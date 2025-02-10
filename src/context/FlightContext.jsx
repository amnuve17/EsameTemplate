import { createContext, useState, useEffect, useContext } from 'react';

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch('https://api.aviationstack.com/v1/flights?access_key=45e458ca2e07bdde49f4229e4b4ecfd4&limit=9')
      .then((res) => res.json())
      .then((data) => {
        const extractedFlights = data.data.map((flight) => ({
          airlineName: flight.airline.name,
          flightIata: flight.flight.iata,
          departureAirport: flight.departure.airport,
          arrivalAirport: flight.arrival.airport,
          flightState: flight.flight_status	
        }));
        setFlights(extractedFlights);
      })
      .catch((error) => console.error("Errore nel fetch:", error));
  }, []);

  return (
    <FlightContext.Provider
      value={{
        flights,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => {
  return useContext(FlightContext);
};

export default FlightContext;
