import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFav } from "../context/FavContext";

function ListaPreferiti() {
  const { favs, removeFav } = useFav();

  const handleDelete = (id) => {
    removeFav(id);
  };

  return (
    <>
      <div className="max-w-6xl py-5 mx-auto my-5">
        <div className="flex my-5">
          <div className="w-1/3">
            <p className="text-4xl font-bold">Lista Preferiti</p>
          </div>
          <div className="flex justify-end w-2/3"></div>
        </div>
        <div className="my-5">
          <div className="flex flex-wrap">
            {favs.map((fav) => (
              <div key={fav.id} className="w-1/3 p-2">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <div className="flex items-center justify-between">
                        <p>{fav.airline} {fav.iata}</p>
                        <img
                          src="/trash-can.png"
                          className="w-[20px] h-[20px] cursor-pointer"
                          onClick={() => handleDelete(fav.id)}
                          alt="Elimina"
                        />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-2">
                      <p>Da:</p>
                      <p>{fav.departure_airport}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p>A:</p>
                      <p>{fav.arrival_airport}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p>Stato:</p>
                      <p>{fav.status}</p>
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

export default ListaPreferiti;
