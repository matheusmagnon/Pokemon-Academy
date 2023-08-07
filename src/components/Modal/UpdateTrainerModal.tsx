/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Dialog from '@radix-ui/react-dialog';
import { MagnifyingGlass, Trash, XCircle } from 'phosphor-react';
import { NewPokemon } from './LinkPokemonToTrainerModal';
import { PokemonAcademyContext, TrainerType } from '../../context/PokemonAcademyContext'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { useContext, useRef } from 'react';
import { PokemonCard } from '../PokemonsCard';
import { v4 as uuidv4 } from 'uuid'
import { ShowPokemonSearch } from './ShowPokemonSearch';

interface UpdateTrainerProps {
    trainerToUpdate: TrainerType
}


export function UpdateTrainerModal({ trainerToUpdate }: UpdateTrainerProps) {

    const { updateTrainer, fetchPokemonByName, pokemonSearch } = useContext(PokemonAcademyContext)

    const { register, handleSubmit, reset } = useForm<TrainerType>()
    const refNamePokemon = useRef(null)

    function handleUpdateTrainer(data: TrainerType) {

        console.log(trainerToUpdate);
        console.log(data);


        reset()
        updateTrainer(trainerToUpdate, data)
    }

    const handleSearch = () => {

        const query = refNamePokemon?.current.value;

        fetchPokemonByName(query);
    }

    return (
        <Dialog.Portal className="align-middle">
            <Dialog.Overlay className="fixed inset-0 bg-white/40" />
            <Dialog.Content className="fixed  w-1/2 h-fit top-96 -translate-y-96 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 p-4 shadow">
                <div className='flex justify-between items-center pb-1'>
                    <Dialog.Title className="font-bold text-xl text-gray-100">
                        Edite as informações do treinador
                    </Dialog.Title>
                    <Dialog.Close>
                        <XCircle size={28} className='text-gray-100' />
                    </Dialog.Close>
                </div>
                <form onSubmit={handleSubmit(handleUpdateTrainer)} className='flex flex-col'>
                    <div className=' flex flex-wrap space-x-2 justify-between mb-4'>
                        <div className='flex flex-col text-gray-100'>
                            <span>Nome:</span>
                            <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                                type="text"
                                placeholder={trainerToUpdate.name}
                                {...register('name')}
                            />
                        </div>
                        <div className='flex flex-col text-gray-100'>
                            <span>Idade:</span>
                            <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                                type="number"
                                placeholder={trainerToUpdate.age?.toString()}
                                {...register('age', { valueAsNumber: true })}
                            />
                        </div>
                        <div className='flex flex-col text-gray-100'>
                            <span>Cidade de nascimento:</span>
                            <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                                type="text"
                                placeholder={trainerToUpdate.cityOfBirth}
                                {...register('cityOfBirth')}
                            />
                        </div>

                    </div>
                    {/* <div className='flex flex-wrap'> */}
                    <div className=' flex flex-row justify-between space-x-2 h-9'>
                        <input className='text-gray-300 bg-gray-700 p-1 w-full  rounded-md'
                            type="text"
                            placeholder="Pesquise um Pokemon para adicionar ao Treinador"
                            ref={refNamePokemon}
                            required
                            defaultValue={''}
                        />
                        <button type="button" onClick={(refNamePokemon) => handleSearch(refNamePokemon)} className="flex items-center border-2 border-green-900 p-2 rounded-lg 
                        space-x-1  hover:bg-green-800 hover:text-gray-100 text-gray-200 duration-150">
                            <MagnifyingGlass size={20} />
                            <span>
                                Buscar
                            </span>
                        </button>
                    </div>
                    {pokemonSearch != undefined &&
                        <ShowPokemonSearch
                            age={trainerToUpdate.age}
                            cityOfBirth={trainerToUpdate.cityOfBirth}
                            id={trainerToUpdate.id}
                            name={trainerToUpdate.name}
                            pokemons={trainerToUpdate.pokemons}
                        />
                    }


                    {/* </div> */}
                    <h3 className="m-1 text-lg font-medium text-white">Pokemons do treinador:</h3>
                    <ul className="grid w-full gap-2 md:grid-cols-3 ">
                        {trainerToUpdate.pokemons?.map((pokemon) => {
                            return (
                                <PokemonCard
                                    key={uuidv4()}
                                    ability={pokemon.ability}
                                    cover={pokemon.cover}
                                    name={pokemon.name}
                                    types={pokemon.types} />
                            )
                        })}
                    </ul>
                    <div className=' flex justify-between'>
                        <button type="submit" className=' mt-4 text-gray-100 bg-green-800 rounded-lg w-32 p-2'>
                            {/* disabled={isSubmitting} */}
                            Alterar dados
                        </button>

                        <Dialog.Close className=' mt-4 text-gray-100 bg-blue-800 rounded-lg w-32 p-2'>
                            Voltar
                        </Dialog.Close>
                        {/* <Dialog.Root>
                            <Dialog.Trigger className="mt-4 text-gray-100 bg-green-800 rounded-lg p-2">
                                Vincular Pokemons
                            </Dialog.Trigger>
                            <NewPokemon />
                        </Dialog.Root> */}
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )

}