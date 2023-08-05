/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Dialog from '@radix-ui/react-dialog';
import { XCircle } from 'phosphor-react';
import { ChangeEvent, useContext, useEffect, useReducer, useState } from 'react';
import { PokemonAcademyContext, PokemonsType } from '../../context/PokemonAcademyContext';
import { api } from '../../lib/axios';
import { PaginationButtons } from '../PaginationButtons';

import { v4 as uuidv4 } from 'uuid'

export function LinkPokemonToTrainer() {
    const {
        pokemonsOfTrainer, currentPokemons, fetchPokemons, addPokemonToTrainer, state, currentPage
    } = useContext(PokemonAcademyContext)

    // const [_, forceUpdate] = useReducer(x => x + 1, 0);

    const handlePokemonToTrainer = (e: EventTarget & HTMLInputElement) => {

        const pokemonObject = JSON.parse(e.target._wrapperState.initialValue)

        addPokemonToTrainer(pokemonObject)

    }
    // console.log("pokemons trainer", pokemonsOfTrainer);


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
                            defaultValue={''}

                        // {...register('description')}
                        />
                    </div>

                    <div className='flex flex-wrap justify-center '>
                        <h3 className="mb-5 text-lg font-medium text-white">Clique para escolher seu Pokemon:</h3>
                        <ul className="grid w-fit gap-2 md:grid-cols-3">
                            {currentPokemons?.map((pokemon) => {
                                return (
                                    <li key={pokemon.id} className='flex'>
                                        <input className="hidden peer"
                                            type="checkbox" id={pokemon.id?.toString()}
                                            value={JSON.stringify(pokemon)}
                                            checked={pokemon.isChecked || undefined}
                                            onClick={(e) => handlePokemonToTrainer(e)}

                                        //onChange={(e) => {
                                        //  handlePokemonToTrainer(e);
                                        //    }} 
                                        />
                                        <label htmlFor={pokemon.id?.toString()} className="disabled:cursor-not-allowed w-56 flex justify-center p-2 border-2 rounded-lg  
                                         hover:text-gray-300 border-gray-700 peer-checked:border-green-900 peer-checked:bg-teal-950 
                                         peer-checked:text-gray-300  text-gray-400 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 ">
                                            <div className="flex flex-col w-full">
                                                <div className='flex  bg-gray-50 border-red-500 justify-center rounded-lg w-full'>
                                                    <img src={pokemon.cover} className='bg-slate-50 w-16' />
                                                </div>
                                                <div className="w-full text-lg font-semibold">{pokemon.name}</div>
                                                <div className="w-full text-sm flex items-center">Tipos:
                                                    {pokemon.types.map((t) => {
                                                        return (
                                                            <div key={uuidv4()} className='flex justify-center align-top ml-1 pb-1  px-1 bg-teal-900 rounded-lg text-gray-100 '>
                                                                {` ${t}`}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                {
                                                    state > 0 && <span className='text-gray-200'>{state}</span>
                                                }
                                                <div className="flex flex-row justify-start text-sm ">
                                                    <div className="flex flex-wrap items-baseline">
                                                        <span>Habilidades:</span>
                                                        {pokemon.ability.map((t) => {
                                                            return (
                                                                <div key={uuidv4()} className='flex justify-center align-top mt-1 ml-1 pb-1 px-1 bg-lime-900 rounded-lg text-gray-100 '>
                                                                    {/* w-full mt-1 flex justify-center align-top pb-1 px-2 bg-lime-900 rounded-lg text-gray-100  */}
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
                    <PaginationButtons />
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