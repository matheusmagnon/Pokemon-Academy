/* eslint-disable @typescript-eslint/no-unused-vars */
import { MagnifyingGlass, NotePencil, Trash } from "phosphor-react"
import { useContext } from "react"
import { PokemonAcademyContext } from "./context/PokemonAcademyContext"
import * as Dialog from '@radix-ui/react-dialog';
// import { Buttom } from "./components/Buttom";
import { NewTrainerModal } from "./components/Modal/NewTrainerModal";
import { useForm } from "react-hook-form";
import { UpdateTrainerModal } from "./components/Modal/UpdateTrainerModal";

import logo from './assets/logo.png'
import { TrainerType } from "./types/types";

// import { v4 as uuidv4 } from 'uuid'

function App() {
  const { trainers,
    deleteTrainer,
    searchTrainerByName,
    trainerToSearch,
    // isMobile,
    resetSearchTrainer } = useContext(PokemonAcademyContext)

  let viewTable

  if (trainerToSearch?.length > 0) {
    viewTable = trainerToSearch
  } else { viewTable = trainers }

  const { handleSubmit, register } = useForm<TrainerType>()

  function handleSearchTrainer(data: TrainerType) {
    searchTrainerByName(data)
  }
  function handleResetSearchTrainers() {
    resetSearchTrainer()
  }

  return (
    <div className="bg-gray-900 p-3 md:px-52 h-screen flex flex-col  font-dmSans text-gray-200 ">
      <header className="h-fit flex flex-row justify-between items-center w-full">
        <img className="lg:h-16 h-10"
          src={logo}
          alt="Pokemon"
        ></img>
        <h1 className="lg:text-3xl text-xl">Pokemon Academy</h1>
        <Dialog.Root>
          <Dialog.Trigger className=" flex lg:text-base text-xs bg-green-800 text-white p-2 rounded-lg hover:bg-green-900" >
            Novo treinador
          </Dialog.Trigger>
          <NewTrainerModal />
        </Dialog.Root>

      </header>
      <form onSubmit={handleSubmit(handleSearchTrainer)} className=" flex flex-row items-center 
      justify-between w-full pt-4 space-x-4">
        <input type="text" placeholder="Busque por treinadores" className="h-10 bg-slate-800 border-2 border-blue-950 w-full 
        px-2 rounded-lg text-xs" {...register('name')} required />
        <button type="submit" className="flex border-2 border-green-900 lg:p-2 lg:text-base text-xs p-1 rounded-lg md:space-x-1 space-x-0 
        w-56 hover:bg-green-800 hover:text-gray-100 text-green-600 duration-150">
          <MagnifyingGlass size={20} />
          <span className="md:text-basetext-xs">
            Buscar treinador
          </span>
        </button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left text-gray-400">
          <caption className="lg:p-5 p-2 text-lg font-semibold text-left text-white bg-gray-800">
            Nossos treinadores
            {trainers.length > 0 &&
              <p className="mt-1 text-sm font-normal text-gray-400">
                Navegue por uma lista de treinadores especializados em dominar pokemons,
                melhorar suas habilidades e evolui-los para um próximo nivel.
              </p>
            }
            {trainers.length == 0 &&
              <p className="mt-1 text-sm font-normal text-gray-400">
                Clique em no botão "Novo treinador" para iniciar um cadastro de treinador
              </p>
            }
          </caption>
          <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="lg:px-6 px-2 py-3">
                Nome do treinador
              </th>
              <th scope="col" className="lg:px-6 px-2 py-3">
                Idade do treinador
              </th>
              <th scope="col" className="lg:px-6 px-2  py-3">
                Cidade de nascimento
              </th>
              <th scope="col" className="lg:px-4 px-2  py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {viewTable?.map((trainer) => {
              return (
                <tr key={trainer.id} className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-600 cursor-pointer">
                  <td scope="row" className="lg:px-6 px-2  py-2 font-medium  whitespace-nowrap text-white">
                    {trainer.name}
                  </td>
                  <td className="px-6 py-2">
                    {trainer.age}
                  </td>
                  <td className="px-6 py-2">
                    {trainer.cityOfBirth}
                  </td>
                  <Dialog.Root>

                    <td className="flex lg:space-x-2 items-center px-2  py-3">
                      {/* <a href="#" className="font-medium"><span className=" text-blue-600 hover:underline">Detalhes</span></a> */}

                      <Dialog.Trigger  >
                        <NotePencil className="text-blue-600 hover:text-blue-950" size={20} />
                      </Dialog.Trigger>


                      <Trash onClick={() => { deleteTrainer(trainer) }} className="text-blue-600 hover:text-red-900" size={20} />
                    </td>
                    <UpdateTrainerModal trainerToUpdate={trainer} />
                    {/* {isMobile && <MobileUpdateTrainer trainerToUpdate={trainer} />} */}
                  </Dialog.Root>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
      <button className="bg-blue-800 w-44 rounded-lg p-1 mt-4" onClick={() => handleResetSearchTrainers()}>Limpar pesquisa</button>

    </div>
  )
}

export default App
