/* eslint-disable @typescript-eslint/no-unused-vars */
import { MagnifyingGlass, NotePencil, Trash } from "phosphor-react"
import { useContext, useState } from "react"
import { PokemonAcademyContext, TrainerType } from "./context/PokemonAcademyContext"
import * as Dialog from '@radix-ui/react-dialog';
// import { Buttom } from "./components/Buttom";
import { NewTrainerModal } from "./components/Modal/NewTrainerModal";
import { useForm } from "react-hook-form";
import { UpdateTrainerModal } from "./components/Modal/UpdateTrainerModal";

// import { v4 as uuidv4 } from 'uuid'

function App() {
  const { trainers, deleteTrainer, searchTrainerByName, trainerToSearch } = useContext(PokemonAcademyContext)


  let viewTable

  if (trainerToSearch.length > 0) {
    viewTable = trainerToSearch
  } else { viewTable = trainers }

  const { handleSubmit, register } = useForm<TrainerType>()

  function handleSearchTrainer(data: TrainerType) {
    searchTrainerByName(data)

  }
  console.log(trainerToSearch);
  return (
    <div className="bg-gray-900 p-3 md:px-52 h-screen flex flex-col  font-dmSans text-gray-200 ">
      <header className="h-fit flex flex-row justify-between w-full">
        <h1 className="text-2xl">Pokemon Academy</h1>
        <Dialog.Root>
          <Dialog.Trigger className=" flex bg-green-800 text-white p-2 rounded-lg hover:bg-green-900" >
            Novo treinador
          </Dialog.Trigger>
          <NewTrainerModal />
        </Dialog.Root>

      </header>
      <form onSubmit={handleSubmit(handleSearchTrainer)} className=" flex flex-row items-center justify-between w-full pt-4 space-x-4">
        <input type="text" placeholder="Busque por treinadores" className="h-10 bg-gray-950 w-full px-2 rounded-lg" {...register('name')} required />
        <button type="submit" className="flex border-2 border-green-900 p-2 rounded-lg space-x-1 w-56 hover:bg-green-800 hover:text-gray-100 text-green-600 duration-150"> <MagnifyingGlass size={20} /><span>Buscar treinador</span></button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-white bg-gray-800">
            Nossos treinadores
            <p className="mt-1 text-sm font-normal text-gray-400">Navegue por uma lista de treinadores especializados em domesticar pokemons, melhorar suas habilidades, deixa-los com melhor reflexos e evolui-los para um próximo nivel.</p>
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

            {viewTable.map((trainer) => {
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

                    <Dialog.Root>
                      <Dialog.Trigger  >
                        <NotePencil className="text-blue-600 hover:text-blue-950" size={20} />
                      </Dialog.Trigger>
                      <UpdateTrainerModal trainerToUpdate={trainer} />
                    </Dialog.Root>

                    <Trash onClick={() => { deleteTrainer(trainer) }} className="text-blue-600 hover:text-red-900" size={20} />
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
