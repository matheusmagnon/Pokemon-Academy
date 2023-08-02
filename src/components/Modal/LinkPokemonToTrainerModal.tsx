/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Dialog from '@radix-ui/react-dialog';
import { XCircle } from 'phosphor-react';
import { useContext, useEffect, useState } from 'react';
import { PokemonAcademyContext } from '../../context/PokemonAcademyContext';
import { api } from '../../lib/axios';

export function LinkPokemonToTrainer() {
    const { pokemons } = useContext(PokemonAcademyContext)

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
                        <ul className="grid w-full gap-2 md:grid-cols-3">
                            {pokemons.map((pokemon) => {
                                return (
                                    <li key={pokemon.id} className='flex'>
                                        <input type="checkbox" id={pokemon.id} value={pokemon.id} className="hidden peer" />
                                        <label htmlFor={pokemon.id} className=" w-56 flex p-2 border-2 rounded-lg cursor-pointer
                                         hover:text-gray-300 border-gray-700 peer-checked:border-green-900 peer-checked:bg-green-700 
                                         peer-checked:text-gray-300  text-gray-400 bg-gray-800 hover:bg-gray-700">
                                            <div className="flex flex-col justify-center items-center">
                                                <div className='flex bg-slate-50 justify-center rounded-lg w-11/12'>
                                                    <img src={pokemon.cover} className=' bg-slate-50' />
                                                </div>
                                                <div className="w-full text-lg font-semibold">{pokemon.name}</div>
                                                {/* <div className="w-full text-sm">Tipo: <strong>{pokemon.types}</strong> </div> */}
                                                <div className="w-full text-sm flex items-center">Tipos:
                                                    {pokemon.types.map((t) => {
                                                        return (
                                                            <div key={pokemon.id} className='flex justify-center align-top ml-1 pb-1  px-1 bg-teal-900 rounded-lg text-gray-100 '>
                                                                {` ${t}`}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div className="flex flex-row justify-start text-sm">
                                                    <div className="flex flex-wrap ">Habilidades:
                                                        {pokemon.ability.map((t) => {
                                                            return (
                                                                <div key={pokemon.id} className='w-full mt-1 flex justify-center align-top pb-1 px-2 bg-lime-900 rounded-lg text-gray-100 '>
                                                                    {` ${t}`}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
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