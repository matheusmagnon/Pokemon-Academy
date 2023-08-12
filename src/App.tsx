
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router.tsx';
import { PokemonAcademyProvider } from './context/PokemonAcademyContext.tsx'
// import { Home } from "./routes/Home/index.tsx";

function App() {
  return (
    <BrowserRouter>
      <PokemonAcademyProvider>
        <Router />
      </PokemonAcademyProvider>
    </BrowserRouter>

  )
}

export default App