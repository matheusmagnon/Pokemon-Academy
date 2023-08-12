import { useLocation } from "react-router-dom";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { v4 as uuidv4 } from 'uuid'
import { PokemonType } from "../../types/types";

export function TrainerDetails() {
    const location = useLocation()
    const trainersDetail = location.state
    const pokemonsOfTrainer = trainersDetail.pokemons

    return (
        <Container>
            <Header action='back' />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
                <table className="w-full text-sm text-left text-gray-400">
                    <caption className="lg:p-2 p-2 text-lg font-semibold text-left text-white bg-gray-800">
                        Detalhes do treinador
                    </caption>
                    <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="lg:px-6 px-2 py-3">
                                Nome do treinador
                            </th>
                            <th scope="col" className="lg:px-6 px-2 py-3">
                                Idade do treinador
                            </th>
                            <th scope="col" className="lg:px-6 px-2  py-3">
                                Cidade de nascimento
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                            <td scope="row" className="lg:px-6 px-2  py-2 font-medium  whitespace-nowrap text-white">
                                {trainersDetail.name}
                            </td>
                            <td className="px-6 py-2">
                                {trainersDetail.age}
                            </td>
                            <td className="px-6 py-2">
                                {trainersDetail.cityOfBirth}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 bg-gray-800">
                <h2 className="text-xl font-bold px-10">Pokemons do treinador:</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-2 px-10 py-3">
                    {pokemonsOfTrainer?.map((pokemon: PokemonType) => {
                        return (
                            <>
                                <label htmlFor={pokemon.id?.toString()} className="w-56 flex justify-center p-2 peer-disabled:cursor-not-allowed border-2 rounded-lg  
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
                                        <div className="flex flex-row  items-end text-sm ">
                                            <div className='flex'>
                                                <div className="flex flex-wrap items-baseline ">
                                                    <span>Habilidades:</span>
                                                    {pokemon.ability?.map((t) => {
                                                        return (
                                                            <div key={uuidv4() + 1} className='flex justify-center align-top mt-1 ml-1 pb-1 px-1 bg-lime-900 rounded-lg text-gray-100 '>
                                                                {` ${t}`}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </>
                        )
                    })}
                </div>
            </div>
        </Container>
    )
}