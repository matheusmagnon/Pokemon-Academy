import { useContext } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import './styles.css';
import { v4 as uuidv4 } from 'uuid'

import { PokemonAcademyContext } from '../../../context/PokemonAcademyContext';
import { CheckCircle } from 'phosphor-react';

export function PokemonsViewMobile() {
    const { currentPokemons, fetchPokemonByName, addPokemonToTrainer, fetchPokemonsByPage, currentPage
    } = useContext(PokemonAcademyContext)

    const handlePokemonToTrainer = (e: EventTarget & HTMLInputElement) => {
        const pokemonObject = JSON.parse(e.target._wrapperState.initialValue)
        addPokemonToTrainer(pokemonObject)
    }

    return (
        < ScrollArea.Root className=" flex justify-center h-60 rounded-xl shadow overflow-hidden bg-gray-700" >
            <ScrollArea.Viewport className="w-full h-full border-inherit">
                <div className=' bg-gray-700 p-1 flex justify-center' >
                    <ul className="grid w-fit gap-2 grid-cols-1 self-center shadow">
                        {currentPokemons?.map((pokemon) => {
                            return (
                                <li
                                    key={uuidv4()}
                                    className='flex'>
                                    <input className="hidden peer"
                                        key={uuidv4()}
                                        type="checkbox"
                                        id={pokemon.id?.toString()}
                                        value={JSON.stringify(pokemon)}
                                        checked={pokemon.isChecked || undefined}
                                        onChange={(e) => {
                                            handlePokemonToTrainer(e)
                                        }}
                                    />
                                    <label htmlFor={pokemon.id?.toString()} className="w-52 flex justify-center p-2 cursor-pointer peer-disabled:cursor-not-allowed border-2 rounded-2xl  
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
                                                        <div key={uuidv4() + 10} className='flex justify-center align-top ml-1 pb-1  
                                                        px-1 bg-teal-900 rounded-lg text-gray-100 '>
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
                                                                <div key={uuidv4() + 1} className='flex justify-center align-top 
                                                                mt-1 ml-1 pb-1 px-1 bg-lime-900 rounded-lg text-gray-100 '>
                                                                    {` ${t}`}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                {pokemon.isChecked && <CheckCircle weight={'bold'} size={42} />}
                                            </div>
                                        </div>
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                <ScrollArea.Thumb className="ScrollAreaThumb" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
                <ScrollArea.Thumb className="ScrollAreaThumb" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="ScrollAreaCorner" />
        </ScrollArea.Root >
    )
}
export default PokemonsViewMobile