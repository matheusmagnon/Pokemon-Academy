import { useContext } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import './styles.css';
import { v4 as uuidv4 } from 'uuid'

import { PokemonAcademyContext, TrainerType } from '../../../context/PokemonAcademyContext';
import { CheckCircle } from 'phosphor-react';
import { PokemonCard } from '../../PokemonsCard';

export function MobileScrollEditTrainer(trainerToUpdate: TrainerType) {
    console.log(trainerToUpdate);

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
                        {trainerToUpdate.pokemons?.map((pokemon) => {
                            return (
                                <PokemonCard
                                    icon='trash'
                                    key={uuidv4()}
                                    ability={pokemon.ability}
                                    cover={pokemon.cover}
                                    name={pokemon.name}
                                    types={pokemon.types} />
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
export default MobileScrollEditTrainer