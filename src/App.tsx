import { MagnifyingGlass } from "phosphor-react"
import { useContext, useState } from "react"
import { PokemonAcademyContext } from "./context/PokemonAcademyContext"
import * as Dialog from '@radix-ui/react-dialog';
import { Buttom } from "./components/Buttom";
import { NewTrainerModal } from "./components/NewTrainerModal";

// import { v4 as uuidv4 } from 'uuid'

function App() {
  const { trainers } = useContext(PokemonAcademyContext)
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  console.log(trainers, "app");

  const handleDropdown = () => {

    setDropdownIsOpen(!dropdownIsOpen);
    // event.preventDefault();
  };
  return (
    // <PokemonAcademyProvider>
    <div className="bg-gray-900 p-3 md:px-52 h-screen flex flex-col  font-dmSans text-gray-200 ">
      <header className="h-fit flex flex-row justify-between w-full">
        <h1 className="text-2xl">Pokemon Academy</h1>
        <Dialog.Root>
          <Dialog.Trigger >
            <Buttom>Novo treinador</Buttom>
          </Dialog.Trigger>
          <NewTrainerModal />
        </Dialog.Root>

      </header>
      <form className=" flex flex-row items-center justify-between w-full pt-4 space-x-4">
        <input type="text" placeholder="Busque por treinadores" className="h-10 bg-gray-950 w-full px-2 rounded-lg" />
        <button type="submit" className="flex border-2 border-green-900 p-2 rounded-lg space-x-3 w-32 hover:bg-green-800 hover:text-gray-100 text-green-600 duration-150"> <MagnifyingGlass size={20} /><span>Buscar</span></button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-white bg-gray-800">
            Nossos treinadores
            <p className="mt-1 text-sm font-normal text-gray-400">Navegue por uma lista de treinadores especializados domesticar pokemons, melhorar suas habilidades, deixa-los com melhor reflexos e evolui-los para um próximo nivel.</p>
          </caption>
          <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome do treinador
              </th>
              <th scope="col" className="px-6 py-3">
                Idade do treinador
              </th>
              <th scope="col" className="px-6 py-3">
                Cidade de nascimento
              </th>
              <th scope="col" className="px-6 py-3">

              </th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => {
              return (
                <tr key={trainer.id} className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-600 cursor-pointer">
                  <th scope="row" className="px-6 py-2 font-medium  whitespace-nowrap text-white">
                    {trainer.name}
                  </th>
                  <td className="px-6 py-2">
                    {trainer.age}
                  </td>
                  <td className="px-6 py-2">
                    {trainer.cityOfBirth}
                  </td>

                  <td className="flex space-x-2 items-center py-2">
                    <a href="#" className="font-medium"><span className=" text-blue-600 hover:underline">Detalhes</span></a>


                    <div className="float-left ">
                      <button onClick={() => handleDropdown()}>Dropdown
                        {/* <i class="fa fa-caret-down"></i> */}
                      </button>
                      {dropdownIsOpen && <div key={trainer.id} className=" bg-black absolute z-10 flex flex-col">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                      </div>}
                    </div>






                    {/* <div className="relative inline-block">
                        <button onClick={handleDropdown} data-dropdown-toggle="dropdown" className=" flex bg-green-800 text-white p-2 rounded-lg hover:bg-green-900"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="sbui-icon ">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                          Ação</button>
                        <div id="dropdown" className="absolute inline-block  divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="m-0 absolute  py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Atualizar dados do treinador</a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Deletar treinador</a>
                          </li>
                        </ul> */}
                    {/* </div> */}
                    {/* </div> */}
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>


    </div>
    // </PokemonAcademyProvider>
  )
}

export default App
