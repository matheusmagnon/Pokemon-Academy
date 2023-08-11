import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircle, MagnifyingGlass, XCircle } from 'phosphor-react';
import { PokemonAcademyContext, TrainerType } from '../../context/PokemonAcademyContext'
import { useForm } from 'react-hook-form';
import { useContext, useRef } from 'react';
import { PokemonCard } from '../PokemonsCard';
import { v4 as uuidv4 } from 'uuid'
import { ShowPokemonSearch } from './ShowPokemonSearch';

interface UpdateTrainerProps {
    trainerToUpdate: TrainerType
}

export function UpdateTrainerModal({ trainerToUpdate }: UpdateTrainerProps) {

    const { updateTrainer, fetchPokemonByName, trainers, addPokemonToTrainer, currentPokemons, } = useContext(PokemonAcademyContext)

    const { register, handleSubmit, reset } = useForm<TrainerType>()
    const refNamePokemon = useRef(null)

    function handleUpdateTrainer(newData: TrainerType) {
        console.log('entro');
        reset()
        updateTrainer(trainerToUpdate, newData)
    }

    const handlePokemonToTrainer = (e) => {
        const pokemonObject = JSON.parse(e.target._wrapperState.initialValue)
        addPokemonToTrainer(trainerToUpdate, pokemonObject)
    }

    const handleSearch = () => {
        if (trainerToUpdate.pokemons?.length > 5) {
            alert('Você já possui 6 pokemons')
        }
        else {
            const query = refNamePokemon?.current.value;
            fetchPokemonByName(query);
        }

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
                    <div className=' flex flex-row justify-between space-x-2 h-9'>
                        <input className='text-gray-300 bg-gray-700 p-1 w-full  rounded-md'
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
                    {currentPokemons.length == 1 &&

                        <div className='flex flex-col justify-center items-center mt-2'>
                            <h2 className='text-2xl text-gray-200'>Sua pesquisa:</h2>
                            <li
                                key={uuidv4()}
                                className='flex'>
                                <input className="hidden peer"
                                    key={uuidv4()}
                                    type="checkbox"
                                    id={currentPokemons[0].id?.toString()}
                                    // defaultValue={JSON.stringify(pokemon) || undefined}
                                    value={JSON.stringify(currentPokemons[0])}
                                    checked={currentPokemons[0].isChecked || undefined}
                                    // onClick={(e) => setTimeout(() => {
                                    //     fetchPokemons(currentPage)
                                    // }, 1000)}
                                    // disabled={pokemon.isChecked}
                                    onChange={(e) => {
                                        handlePokemonToTrainer(e)
                                    }}
                                />
                                <label htmlFor={currentPokemons[0].id?.toString()} className="w-56 flex justify-center p-2 cursor-pointer peer-disabled:cursor-not-allowed border-2 rounded-lg  
                                         hover:text-gray-300 border-gray-700 peer-checked:border-green-900 peer-checked:bg-teal-950 
                                         peer-checked:text-gray-300  text-gray-400 bg-gray-800 hover:bg-gray-700">

                                    <div className="flex flex-col w-full">
                                        <div className='flex  bg-gray-50 border-red-500 justify-center rounded-lg w-full'>
                                            <img src={currentPokemons[0].cover} className='bg-slate-50 w-16' />
                                        </div>
                                        <div className="w-full text-lg font-semibold">{currentPokemons[0].name}</div>
                                        <div className="w-full text-sm flex items-center">Tipos:
                                            {currentPokemons[0].types?.map((t) => {
                                                return (
                                                    <div key={uuidv4() + 10} className='flex justify-center align-top ml-1 pb-1  px-1 bg-teal-900 rounded-lg text-gray-100 '>
                                                        {` ${t}`}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="flex flex-row justify-end items-end text-sm ">
                                            <div className='flex'>
                                                <div className="flex flex-wrap items-baseline">
                                                    <span>Habilidades:</span>
                                                    {currentPokemons[0].ability?.map((t) => {
                                                        return (
                                                            <div key={uuidv4() + 1} className='flex justify-center align-top mt-1 ml-1 pb-1 px-1 bg-lime-900 rounded-lg text-gray-100 '>
                                                                {/* w-full mt-1 flex justify-center align-top pb-1 px-2 bg-lime-900 rounded-lg text-gray-100  */}
                                                                {` ${t}`}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            {currentPokemons[0].isChecked && <CheckCircle weight={'bold'} size={42} />}
                                        </div>
                                    </div>

                                    {/* </div> */}
                                </label>
                            </li>
                        </div>
                    }

                    {/* {currentPokemons.length == 1 &&
                        <ShowPokemonSearch
                            age={trainerToUpdate.age}
                            cityOfBirth={trainerToUpdate.cityOfBirth}
                            id={trainerToUpdate.id}
                            name={trainerToUpdate.name}
                            pokemons={trainerToUpdate.pokemons}
                        />
                    } */}

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