/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircle, MagnifyingGlass, Trash, XCircle } from 'phosphor-react';
import { ChangeEvent, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { PokemonAcademyContext, PokemonType } from '../../context/PokemonAcademyContext';
import { api } from '../../lib/axios';
import { PaginationButtons } from '../PaginationButtons';

import { v4 as uuidv4 } from 'uuid'

export function LinkPokemonToTrainer() {
    const {
        pokemonsOfTrainer, currentPokemons, fetchPokemonByName, addPokemonToTrainer, state, currentPage
    } = useContext(PokemonAcademyContext)

    const refNamePokemon = useRef(null)

    const handlePokemonToTrainer = (e: EventTarget & HTMLInputElement) => {
        const pokemonObject: PokemonsType = JSON.parse(e.target._wrapperState.initialValue)
        addPokemonToTrainer(pokemonObject)
    }

    const handleSearch = () => {

        const query = refNamePokemon?.current.value;

        fetchPokemonByName(query);
    }
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
                    <div className=' flex flex-row justify-between space-x-2 h-9'>
                        <input className='text-gray-300 bg-gray-700 p-1 w-full  rounded-md'
                            type="text"
                            placeholder="Pesquise o nome do pokemon"
                            ref={refNamePokemon}
                            required
                            defaultValue={''}
                        // onChange={(e) => handleSearch(e)}
                        />
                        <button type="button" onClick={(refNamePokemon) => handleSearch(refNamePokemon)} className="flex items-center border-2 border-green-900 p-2 rounded-lg 
                        space-x-1  hover:bg-green-800 hover:text-gray-100 text-gray-200 duration-150">
                            <MagnifyingGlass size={20} />
                            <span>
                                Buscar
                            </span>
                        </button>
                    </div>

                    <div className='flex flex-col justify-center '>
                        <h3 className="mb-5 text-lg font-medium text-white">Clique para escolher seu Pokemon:</h3>
                        {currentPokemons.length == 1 && <ul className="grid w-fit gap-2 md:grid-cols-1">
                            {currentPokemons?.map((pokemon) => {
                                return (
                                    <li
                                        key={uuidv4()}
                                        className='flex'>
                                        <input className="hidden peer"
                                            key={uuidv4()}
                                            type="checkbox"
                                            id={pokemon.id?.toString()}
                                            // defaultValue={JSON.stringify(pokemon) || undefined}
                                            value={JSON.stringify(pokemon)}
                                            checked={pokemon.isChecked || undefined}
                                            // onClick={(e) => setTimeout(() => {
                                            //     fetchPokemons(currentPage)
                                            // }, 1000)}
                                            // disabled={pokemon.isChecked}
                                            onChange={(e) => {
                                                handlePokemonToTrainer(e)
                                            }}
                                        />
                                        <label htmlFor={pokemon.id?.toString()} className="w-56 flex justify-center p-2 cursor-pointer peer-disabled:cursor-not-allowed border-2 rounded-lg  
                                         hover:text-gray-300 border-gray-700 peer-checked:border-green-900 peer-checked:bg-teal-950 
                                         peer-checked:text-gray-300  text-gray-400 bg-gray-800 hover:bg-gray-700">

                                            <div className="flex flex-col w-full">
                                                <div className='flex  bg-gray-50 border-red-500 justify-center rounded-lg w-full'>
                                                    <img src={pokemon.cover} className='bg-slate-50 w-16' />
                                                </div>
                                                <div className="w-full text-lg font-semibold">{pokemon.name}</div>
                                                <div className="w-full text-sm flex items-center">Tipos:
                                                    {pokemon.types?.map((t) => {
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
                                                            {pokemon.ability?.map((t) => {
                                                                return (
                                                                    <div key={uuidv4() + 1} className='flex justify-center align-top mt-1 ml-1 pb-1 px-1 bg-lime-900 rounded-lg text-gray-100 '>
                                                                        {/* w-full mt-1 flex justify-center align-top pb-1 px-2 bg-lime-900 rounded-lg text-gray-100  */}
                                                                        {` ${t}`}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                    {pokemon.isChecked && <CheckCircle weight={'bold'} size={42} />}
                                                </div>
                                            </div>

                                            {/* </div> */}
                                        </label>
                                    </li>

                                )
                            })}
                        </ul>}
                        {currentPokemons.length > 1 && <ul className="grid w-fit gap-2 md:grid-cols-3">
                            {currentPokemons?.map((pokemon) => {
                                return (
                                    <li
                                        key={uuidv4()}
                                        className='flex'>
                                        <input className="hidden peer"
                                            key={uuidv4()}
                                            type="checkbox"
                                            id={pokemon.id?.toString()}
                                            // defaultValue={JSON.stringify(pokemon) || undefined}
                                            value={JSON.stringify(pokemon)}
                                            checked={pokemon.isChecked || undefined}
                                            // onClick={(e) => setTimeout(() => {
                                            //     fetchPokemons(currentPage)
                                            // }, 1000)}
                                            // disabled={pokemon.isChecked}
                                            onChange={(e) => {
                                                handlePokemonToTrainer(e)
                                            }}
                                        />
                                        <label htmlFor={pokemon.id?.toString()} className="w-56 flex justify-center p-2 cursor-pointer peer-disabled:cursor-not-allowed border-2 rounded-lg  
                                         hover:text-gray-300 border-gray-700 peer-checked:border-green-900 peer-checked:bg-teal-950 
                                         peer-checked:text-gray-300  text-gray-400 bg-gray-800 hover:bg-gray-700">

                                            <div className="flex flex-col w-full">
                                                <div className='flex  bg-gray-50 border-red-500 justify-center rounded-lg w-full'>
                                                    <img src={pokemon.cover} className='bg-slate-50 w-16' />
                                                </div>
                                                <div className="w-full text-lg font-semibold">{pokemon.name}</div>
                                                <div className="w-full text-sm flex items-center">Tipos:
                                                    {pokemon.types?.map((t) => {
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
                                                            {pokemon.ability?.map((t) => {
                                                                return (
                                                                    <div key={uuidv4() + 1} className='flex justify-center align-top mt-1 ml-1 pb-1 px-1 bg-lime-900 rounded-lg text-gray-100 '>
                                                                        {/* w-full mt-1 flex justify-center align-top pb-1 px-2 bg-lime-900 rounded-lg text-gray-100  */}
                                                                        {` ${t}`}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                    {pokemon.isChecked && <CheckCircle weight={'bold'} size={42} />}
                                                </div>
                                            </div>

                                            {/* </div> */}
                                        </label>
                                    </li>

                                )
                            })}
                        </ul>}
                    </div>
                    <PaginationButtons />
                    <div className=' flex justify-center'>
                        <Dialog.Close type="button" className='mt-4 text-gray-100 bg-green-800 rounded-lg w-24 p-2'>
                            Voltar
                        </Dialog.Close>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal >
    )
}