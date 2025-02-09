import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useData } from './context/DataContext';

function App() {
  const {
    sites,
    newSite,
    editingSite,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleEdit,
    resetEditingSite,
  } = useData();

  return (
    <>
      <div className="max-w-6xl p-5 mx-auto my-5 shadow-lg">
        <div className="flex my-5">
          <div className="w-1/3">Preferiti</div>
          <div className="flex justify-end w-2/3">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button>Aggiungi Preferito</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Aggiungi nuovo preferito</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div>
                      <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="name">Nome</label>
                            <input
                              className="p-2 border-black shadow-sm border-1"
                              type="text"
                              id="name"
                              name="name"
                              value={newSite.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="description">Descrizione</label>
                            <input
                              className="p-2 border-black shadow-sm border-1"
                              type="text"
                              id="description"
                              name="description"
                              value={newSite.description}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="imgUrl">Immagine (url)</label>
                            <input
                              className="p-2 border-black shadow-sm border-1"
                              type="text"
                              id="imgUrl"
                              name="imgUrl"
                              value={newSite.imgUrl}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <AlertDialogFooter>
                          <div>
                            <AlertDialogCancel onClick={resetEditingSite}>
                              Annulla
                            </AlertDialogCancel>
                            <AlertDialogAction type="submit">
                              Salva
                            </AlertDialogAction>
                          </div>
                        </AlertDialogFooter>
                      </form>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>

            {editingSite && (
              <AlertDialog open>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Modifica preferito</AlertDialogTitle>
                    <AlertDialogDescription>
                      <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="name">Nome</label>
                            <input
                              className="p-2 border-black shadow-sm border-1"
                              type="text"
                              id="name"
                              name="name"
                              value={newSite.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="description">Descrizione</label>
                            <input
                              className="p-2 border-black shadow-sm border-1"
                              type="text"
                              id="description"
                              name="description"
                              value={newSite.description}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="imgUrl">Immagine (url)</label>
                            <input
                              className="p-2 border-black shadow-sm border-1"
                              type="text"
                              id="imgUrl"
                              name="imgUrl"
                              value={newSite.imgUrl}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={resetEditingSite}>
                            Annulla
                          </AlertDialogCancel>
                          <AlertDialogAction type="submit">
                            Modifica
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </form>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
        <div className="my-5">
          <div className="flex flex-wrap">
            {sites.map((site) => (
              <div key={site.id} className="w-1/4 p-2">
                <Card>
                  <a target="_blank" href={site.url}>
                    <CardHeader>
                      <CardTitle>{site.name}</CardTitle>
                      <CardDescription>{site.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img className="w-[200px]" src={site.imgUrl} />
                    </CardContent>
                  </a>
                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <Button
                        className="bg-red-600 hover:bg-red-800"
                        onClick={() => handleDelete(site.id)}
                      >
                        Cancella
                      </Button>
                      <Button
                        className="bg-blue-600 hover:bg-blue-800"
                        onClick={() => handleEdit(site)}
                      >
                        Modifica
                      </Button>
                    </div>
                  </CardFooter>
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
