import { PokemonsType } from "../context/PokemonAcademyContext";

export function PokemonCard(pokemon: PokemonsType) {
    return (
        <li key={pokemon.id} className='flex'>
            <input type="checkbox" id={pokemon.id} value={pokemon.id} className="hidden peer" />
            <label htmlFor={pokemon.id} className="flex p-2 border-2 rounded-lg cursor-pointer
                                         hover:text-gray-300 border-gray-700 peer-checked:border-green-900 peer-checked:bg-green-700 
                                         peer-checked:text-gray-300  text-gray-400 bg-gray-800 hover:bg-gray-700">
                <div className="flex flex-col justify-center items-center space-y-1">
                    <div className='flex bg-slate-50 justify-center rounded-lg w-52'>
                        <img src={pokemon.cover} className='w-14 bg-slate-50' />
                    </div>
                    <div className="w-full text-lg font-semibold">{pokemon.name}</div>
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
                        <div className="-ml-10 grid grid-cols-2 gap-x-2">Habilidades:
                            {pokemon.ability.map((t) => {
                                return (
                                    <div key={pokemon.id} className='w-20 mt-1 flex justify-center align-top pb-1 px-1 bg-lime-900 rounded-lg text-gray-100 '>
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
}