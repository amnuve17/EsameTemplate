import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFlight } from "./context/FlightContext";
import { useFav } from "./context/FavContext";

function App() {
  const { flights } = useFlight();
  const { favs, addFav } = useFav();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFlights, setFilteredFlights] = useState(flights);

  useEffect(() => {
    setFilteredFlights(flights);
  }, [flights]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      setFilteredFlights(flights);
    } else {
      const filtered = flights.filter((flight) =>
        flight.flightIata?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFlights(filtered);
    }
  };

  const handleAddToFav = (flight) => {
    const alreadyFav = favs.some((fav) => fav.iata === flight.flightIata);

    if (!alreadyFav) {
      const newFav = {
        airline: flight.airlineName,
        iata: flight.flightIata,
        departure_airport: flight.departureAirport,
        arrival_airport: flight.arrivalAirport,
        status: flight.flightState,
      };
      addFav(newFav);
    }
  };

  return (
    <>
      <div className="max-w-6xl py-5 mx-auto my-5">
        <div className="flex my-5">
          <p className="text-4xl font-bold">Lista Voli</p>
        </div>
        <form onSubmit={handleSearch}>
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca per codice IATA"
              className="px-2 border border-black shadow-sm me-5 rounded-xl"
            />
            <button className="px-5 py-2 text-white bg-black shadow-sm rounded-xl">
              Cerca
            </button>
          </div>
        </form>
        <div className="my-5">
          <div className="flex flex-wrap">
            {filteredFlights.map((flight) => (
              <div key={flight.flightIata} className="w-1/3 p-2">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <div className="flex items-center justify-between">
                        <p>
                          {flight.airlineName} {flight.flightIata}
                        </p>
                        <img
                          src={
                            favs.some((fav) => fav.iata === flight.flightIata)
                              ? "/full-heart.svg"
                              : "/heart.svg"
                          }
                          className="w-[20px] h-[20px] cursor-pointer"
                          onClick={() => handleAddToFav(flight)}
                          alt="Aggiungi ai preferiti"
                        />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-2">
                      <p>Da:</p>
                      <p>{flight.departureAirport}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p>A:</p>
                      <p>{flight.arrivalAirport}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p>Stato:</p>
                      <p>{flight.flightState}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
