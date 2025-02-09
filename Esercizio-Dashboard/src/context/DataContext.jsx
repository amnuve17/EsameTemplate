// DataContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Crea il contesto
const DataContext = createContext();

// Crea il provider che gestisce la logica CRUD
export const DataProvider = ({ children }) => {
  const [sites, setSites] = useState([]);
  const [newSite, setNewSite] = useState({
    name: '',
    description: '',
    imgUrl: '',
  });
  const [editingSite, setEditingSite] = useState(null);

  // FETCH
  useEffect(() => {
    fetch('http://localhost:3000/sites/')
      .then((res) => res.json())
      .then((data) => setSites(data))
      .catch((error) => console.error("Errore nel fetch:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSite((prevSite) => ({
      ...prevSite,
      [name]: value,
    }));
  };

  // POST
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newSite.name || !newSite.description || !newSite.imgUrl) {
      alert("Tutti i campi devono essere compilati.");
      return;
    }

    if (editingSite) {
      // PUT
      fetch(`http://localhost:3000/sites/${editingSite.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSite),
      })
        .then((res) => res.json())
        .then((data) => {
          setSites((prevSites) => prevSites.map((site) => (site.id === data.id ? data : site)));
          setEditingSite(null);
          setNewSite({ name: '', description: '', imgUrl: '' });
        })
        .catch((error) => console.error("Errore durante l'aggiornamento:", error));
    } else {
      // POST
      fetch('http://localhost:3000/sites/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSite),
      })
        .then((res) => res.json())
        .then((data) => {
          setSites((prevSites) => [...prevSites, data]);
          setNewSite({ name: '', description: '', imgUrl: '' });
        })
        .catch((error) => console.error("Errore durante l'invio dei dati:", error));
    }
  };

  // DELETE
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/sites/${id}`, { method: 'DELETE' })
      .then(() => setSites((prevSites) => prevSites.filter((site) => site.id !== id)))
      .catch((error) => console.error("Errore durante la cancellazione:", error));
  };

  // Avvia la modifica di un sito
  const handleEdit = (site) => {
    setEditingSite(site);
    setNewSite({ name: site.name, description: site.description, imgUrl: site.imgUrl });
  };

  // Funzione per resettare lo stato di editing
  const resetEditingSite = () => {
    setEditingSite(null);
    setNewSite({ name: '', description: '', imgUrl: '' });
  };

  return (
    <DataContext.Provider
      value={{
        sites,
        newSite,
        editingSite,
        handleInputChange,
        handleSubmit,
        handleDelete,
        handleEdit,
        resetEditingSite,  // Aggiungi questa funzione al contesto
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook per accedere al contesto
export const useData = () => {
  return useContext(DataContext);
};

export default DataContext;
