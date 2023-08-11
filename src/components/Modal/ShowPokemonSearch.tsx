/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Dialog from '@radix-ui/react-dialog';
import { XCircle } from 'phosphor-react';
import { LinkPokemonToTrainer } from './LinkPokemonToTrainerModal';
import { PokemonAcademyContext, TrainerType } from '../../context/PokemonAcademyContext'

import { useContext, useState } from 'react';
import { PokemonCard } from '../PokemonsCard';

import { v4 as uuidv4 } from 'uuid'

export function ShowPokemonSearch(trainerToUpdate: TrainerType) {
    console.log(trainerToUpdate);

    const { pokemonSearch, currentPokemons, fetchPokemonsByPage, currentPage, updateTrainer } = useContext(PokemonAcademyContext)
    const [isDisabled, setIsDisabled] = useState(true)

    function handleUpdateTrainer(trainerToUpdate: TrainerType) {
        // console.log("trainer", trainerToUpdate);
        // console.log("pokemon pesquisa", pokemonSearch);
        const newTrainer = { ...trainerToUpdate, pokemons: [...trainerToUpdate.pokemons, pokemonSearch] }
        updateTrainer(trainerToUpdate, newTrainer)
    }

    const handleResetFetch = () => {
        fetchPokemonsByPage(currentPage)
    }

    return (
        <Dialog.Portal className="align-middle">
            <Dialog.Overlay className="fixed inset-0 bg-black/40" />
            <Dialog.Content className="fixed  w-80 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 p-4 shadow">
                <div className='flex justify-between items-center pb-4'>
                    <Dialog.Title className="font-bold text-xl text-gray-100">Resultado da pesquisa</Dialog.Title>
                    <Dialog.Close>
                        <XCircle size={28} className='text-gray-100' />
                    </Dialog.Close>
                </div>
                {currentPokemons.length == 1 &&
                    <div className='flex justify-center'>
                        <PokemonCard
                            key={uuidv4()}
                            ability={currentPokemons[0]?.ability}
                            cover={currentPokemons[0]?.cover}
                            name={currentPokemons[0]?.name}
                            types={currentPokemons[0]?.types}
                        />
                    </div>}

                <div className=' flex justify-between'>
                    <Dialog.Root>
                        <button onClick={() => handleUpdateTrainer(trainerToUpdate)}
                            className="mt-4 text-gray-100 bg-yellow-700 rounded-lg p-2">
                            Vincular Pokemon
                        </button>
                        {/* <LinkPokemonToTrainer /> */}
                    </Dialog.Root>
                    <button type="button" onClick={() => handleResetFetch()} className='disabled:cursor-not-allowed disabled:opacity-60 mt-4 text-gray-100 bg-green-800 rounded-lg w-24 p-2'>
                        Voltar
                    </button>
                </div>
            </Dialog.Content>
        </Dialog.Portal >
    )
}