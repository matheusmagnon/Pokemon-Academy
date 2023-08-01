import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

interface PokemonsType {
    name: string;
    type: string;
    ability: string;
    cover: string;
}


interface TrainerType {
    id: string;
    name: string;
    age: number;
    cityOfBirth: string;
    pokemons?: PokemonsType[]
}

interface PokemonAcademyContextType {
    trainers: TrainerType[];
    setTrainers: Dispatch<SetStateAction<TrainerType[]>>;
    //
}

interface PokemonAcademyProviderProps {
    children: ReactNode
}

export const PokemonAcademyContext = createContext({} as PokemonAcademyContextType)

export function PokemonAcademyProvider({ children }: PokemonAcademyProviderProps) {
    const [trainers, setTrainers] = useState<TrainerType[]>([
        {
            id: uuidv4(),
            age: 28,
            cityOfBirth: 'Palmas',
            name: 'Matheus Magno',
            pokemons: [{
                name: 'Bulbasauro',
                ability: 'Lança folhas',
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                type: 'Grama'
            }]
        },
        {
            id: uuidv4(),
            age: 25,
            cityOfBirth: 'Florianópolis',
            name: 'Newton',
            pokemons: [{
                name: 'Bulbasauro',
                ability: 'Lança folhas',
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                type: 'Grama'
            }]
        },
        {
            id: uuidv4(),
            age: 32,
            cityOfBirth: 'Florianópolis',
            name: 'Patrick',
            pokemons: [{
                name: 'Bulbasauro',
                ability: 'Lança folhas',
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                type: 'Grama'
            }]
        }, {
            id: uuidv4(),
            age: 28,
            cityOfBirth: 'Palmas',
            name: 'Matheus Magno',
            pokemons: [{
                name: 'Bulbasauro',
                ability: 'Lança folhas',
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                type: 'Grama'
            }]
        }, {
            id: uuidv4(),
            age: 28,
            cityOfBirth: 'Palmas',
            name: 'Matheus Magno',
            pokemons: [{
                name: 'Bulbasauro',
                ability: 'Lança folhas',
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                type: 'Grama'
            }]
        },
    ])
    console.log(trainers, "context");

    return (
        <PokemonAcademyContext.Provider value={{ trainers, setTrainers }}>
            {children}
        </PokemonAcademyContext.Provider>
    )
}