import * as Dialog from '@radix-ui/react-dialog';
import { MagnifyingGlass, XCircle } from 'phosphor-react';
import { PokemonAcademyContext, TrainerType } from '../../../context/PokemonAcademyContext'
import { useForm } from 'react-hook-form';
import { useContext, useRef } from 'react';
// import { PokemonCard } from '../../PokemonsCard';
// import { v4 as uuidv4 } from 'uuid'
import { ShowPokemonSearch } from '.././ShowPokemonSearch';
import { MobileScrollEditTrainer } from './MobileScrollEditTrainer';

interface UpdateTrainerProps {
    trainerToUpdate: TrainerType
}

export function MobileUpdateTrainer({ trainerToUpdate }: UpdateTrainerProps) {

    const { updateTrainer, fetchPokemonByName, pokemonSearch } = useContext(PokemonAcademyContext)

    const { register, handleSubmit, reset } = useForm<TrainerType>()
    const refNamePokemon = useRef(null)

    function handleUpdateTrainer(newData: TrainerType) {
        reset()
        updateTrainer(trainerToUpdate, newData)
    }

    const handleSearch = () => {
        const query = refNamePokemon?.current.value;
        fetchPokemonByName(query);
    }

    return (
        <Dialog.Portal className="align-middle">
            <Dialog.Overlay className="fixed inset-0 bg-white/40" />
            <Dialog.Content className=" absolute  pl-6 top-96 h-fit mt-7 -translate-y-96 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 p-4 shadow">
                <div className='flex justify-between items-center pb-1 self-center'>
                    <Dialog.Title className="font-bold text-base text-gray-100">
                        Edite as informações do treinador
                    </Dialog.Title>
                    <Dialog.Close>
                        <XCircle size={28} className='text-gray-100' />
                    </Dialog.Close>
                </div>
                <form onSubmit={handleSubmit(handleUpdateTrainer)} className='flex flex-col'>
                    <div className=' flex flex-wrap  mb-4 space-y-1 text-sm'>
                        <div className='flex flex-col text-gray-100'>
                            <span>Nome:</span>
                            <input className='text-gray-300 bg-gray-700 p-1 rounded-md w-56'
                                type="text"
                                placeholder={trainerToUpdate.name}
                                {...register('name')}
                            />
                        </div>
                        <div className='flex space-x-4'>
                            <div className='flex flex-col text-gray-100'>
                                <span>Idade:</span>
                                <input className='text-gray-300 bg-gray-700 p-1 rounded-md w-9'
                                    type="number"
                                    placeholder={trainerToUpdate.age?.toString()}
                                    {...register('age', { valueAsNumber: true })}
                                />
                            </div>
                            <div className='flex flex-col text-gray-100'>
                                <span>Cidade de nascimento:</span>
                                <input className='text-gray-300 bg-gray-700 p-1 rounded-md w-full'
                                    type="text"
                                    placeholder={trainerToUpdate.cityOfBirth}
                                    {...register('cityOfBirth')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=' flex flex-row justify-between space-x-2 h-9'>
                        <input className='text-gray-300 text-xs bg-gray-700 p-1 w-full  rounded-md'
                            type="text"
                            placeholder="Pesquise um Pokemon para adicionar ao Treinador"
                            ref={refNamePokemon}
                            // required
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
                    {pokemonSearch?.id > 0 &&
                        <ShowPokemonSearch
                            age={trainerToUpdate.age}
                            cityOfBirth={trainerToUpdate.cityOfBirth}
                            id={trainerToUpdate.id}
                            name={trainerToUpdate.name}
                            pokemons={trainerToUpdate.pokemons}
                        />
                    }

                    <h3 className="m-1 text-lg font-medium text-white">Pokemons do treinador:</h3>
                    <MobileScrollEditTrainer {...trainerToUpdate} />

                    <div className=' flex justify-between mt-4'>
                        <button type="submit" className=' text-gray-100 bg-green-800 rounded-lg w-28 p-2  text-sm'>
                            {/* disabled={isSubmitting} */}
                            Alterar dados
                        </button>

                        <Dialog.Close className=' text-gray-100 bg-blue-800 rounded-lg w-20 p-2 text-sm'>
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