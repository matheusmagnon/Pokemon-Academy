import { Trash } from "phosphor-react";
import { PokemonAcademyContext, } from "../../../context/PokemonAcademyContext";
import { v4 as uuidv4 } from 'uuid'
import { useContext } from "react";
import { PokemonType } from "../../../types/types";

export function PokemonCard(pokemon: PokemonType) {
    const { deletePokemonOfTrainer } = useContext(PokemonAcademyContext)
    return (
        <li
            key={uuidv4()}
            className='flex'>
            <input className="hidden peer"
                key={uuidv4()}
                type="checkbox"
                id={pokemon.id?.toString()}
                value={JSON.stringify(pokemon) || undefined}
                checked={pokemon.isChecked || false}
                onChange={() => { }}
            />
            <label htmlFor={pokemon.id?.toString()} className="w-56 flex justify-center p-2 cursor-pointer peer-disabled:cursor-not-allowed border-2 rounded-lg  
         hover:text-gray-300 border-gray-700 peer-checked:border-green-900 peer-checked:bg-teal-950 
         peer-checked:text-gray-300  text-gray-400 bg-gray-800 hover:bg-gray-700">
                <div className="flex flex-col w-full justify-between">
                    <div className='flex  bg-gray-50 border-red-500 justify-center rounded-lg w-full'>
                        <img src={pokemon.cover} className='bg-slate-50 w-16' />
                    </div>
                    <div className="w-full text-lg font-semibold">{pokemon.name}</div>
                    <div className="w-full text-sm flex items-center">Tipos:
                        {pokemon.types?.map((t) => {
                            return (
                                <div key={uuidv4() + 10} className='flex justify-center align-top ml-1 
                                pb-1  px-1 bg-teal-900 rounded-lg text-gray-100 '>
                                    {` ${t}`}
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-row items-end">
                        <div className="flex flex-row justify-start text-sm ">
                            <div className="flex flex-wrap w-44 items-baseline">
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
                        <div>
                            < Trash
                                className="hover:text-red-800" size={32}
                                onClick={() => deletePokemonOfTrainer(pokemon)}
                            />
                        </div>
                    </div>
                </div>
            </label>
        </li>
    )
}