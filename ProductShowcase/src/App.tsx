import { AppRouter } from './routes/Router';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 p-4 shadow-md">
        <h1 className="text-white text-3xl font-bold text-center">Pokédex</h1>
      </header>
      <main className="container mx-auto p-4">
        <AppRouter />
      </main>
    </div>
  );
}

export default App;