/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Dialog from '@radix-ui/react-dialog';
import { XCircle } from 'phosphor-react';
import { useContext, useEffect, useState } from 'react';
import { PokemonAcademyContext } from '../../context/PokemonAcademyContext';
import { api } from '../../lib/axios';

export function NewPokemon() {
    const { pokemons } = useContext(PokemonAcademyContext)

    // const [dataFetch, setDataFetch] = useState();


    // const fetchUserData = () => {
    //     api.get('').then((response) => {
    //         console.log(response);
    //     })
    // }
    // useEffect(() => {
    //     fetchUserData();
    // }, []);
    // console.log(dataFetch);

    // console.log(pokemons, "mod");

    return (
        <Dialog.Portal className="">
            <Dialog.Overlay className="fixed inset-0 bg-black/40" />
            <Dialog.Content className="fixed h-fit top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 p-4 shadow">
                <div className='flex justify-between items-center pb-4'>
                    <Dialog.Title className="font-bold text-xl text-gray-100">Pesquise o Pokemon que deseja vincular</Dialog.Title>
                    <Dialog.Close>
                        <XCircle size={28} className='text-gray-100' />
                    </Dialog.Close>
                </div>
                <form className='flex flex-col'>
                    <div className=' flex flex-col space-y-2 '>
                        <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                            type="text"
                            placeholder="Pesquise o nome do pokemon"
                            required
                        // {...register('description')}
                        />
                    </div>

                    <div className='flex flex-wrap p-2 justify-center '>
                        <h3 className="mb-5 text-lg font-medium text-white">Clique para escolher seu Pokemon:</h3>
                        <ul className="grid w-full gap-2 md:grid-cols-4">
                            {pokemons.map((pokemon) => {
                                return (
                                    <li key={pokemon.id} className='flex'>
                                        <input type="checkbox" id={pokemon.id} value={pokemon.id} className="hidden peer" />
                                        <label htmlFor={pokemon.id} className="flex p-2 border-2 rounded-lg cursor-pointer
                                         hover:text-gray-300 border-gray-700 peer-checked:border-green-900 peer-checked:bg-green-700 
                                         peer-checked:text-gray-300  text-gray-400 bg-gray-800 hover:bg-gray-700">
                                            <div className="flex flex-col justify-center items-center">
                                                <div className='flex bg-slate-50 justify-center rounded-lg w-3/4'>
                                                    <img src={pokemon.cover} className='w-14 bg-slate-50' />
                                                </div>
                                                <div className="w-full text-lg font-semibold">{pokemon.name}</div>
                                                <div className="w-full text-sm">Tipo: <strong>{pokemon.type}</strong> </div>
                                                <div className="w-full text-sm">Habilidade: <strong>{pokemon.ability}</strong></div>
                                            </div>
                                        </label>
                                    </li>

                                )
                            })}
                        </ul>
                    </div>
                    <div className=' flex justify-between'>
                        <Dialog.Close type="button" className='mt-4 text-gray-100 bg-green-800 rounded-lg w-24 p-2'>
                            {/* disabled={isSubmitting} */}
                            Voltar
                        </Dialog.Close>
                        <button type="submit" className='mt-4 text-gray-100 bg-green-800 rounded-lg w-24 p-2'>
                            {/* disabled={isSubmitting} */}
                            Vincular
                        </button>

                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}