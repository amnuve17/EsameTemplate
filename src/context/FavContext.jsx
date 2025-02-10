import { createContext, useState, useEffect, useContext } from "react";

const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/favs")
      .then((res) => res.json())
      .then((data) => setFavs(data))
      .catch((error) => console.error("Errore nel fetch:", error));
  }, []);

  const addFav = (fav) => {
    fetch("http://localhost:3000/favs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fav),
    })
      .then((res) => res.json())
      .then((newFav) => setFavs((prevFavs) => [...prevFavs, newFav]))
      .catch((error) => console.error("Errore nell'aggiunta del preferito:", error));
  };

  return (
    <FavContext.Provider value={{ favs, addFav }}>
      {children}
    </FavContext.Provider>
  );
};

export const useFav = () => {
  return useContext(FavContext);
};

export default FavContext;
