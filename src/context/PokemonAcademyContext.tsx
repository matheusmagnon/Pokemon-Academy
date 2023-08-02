import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

interface PokemonsType {
    id: string;
    name: string;
    type: string;
    ability: string;
    cover: string;
}


export interface TrainerType {
    id?: string;
    name: string;
    age: number;
    cityOfBirth: string;
    pokemons?: PokemonsType[]
}

interface PokemonAcademyContextType {
    trainers: TrainerType[];
    setTrainers: Dispatch<SetStateAction<TrainerType[]>>;
    createTrainer: (data: TrainerType) => void
    deleteTrainer: (trainerToDelete: TrainerType) => void;
    searchTrainerByName: (data: TrainerType) => void;
    trainerToSearch: TrainerType[];
    pokemons: PokemonsType[];
    setPokemons: Dispatch<SetStateAction<PokemonsType[]>>;
}

interface PokemonAcademyProviderProps {
    children: ReactNode
}

export const PokemonAcademyContext = createContext({} as PokemonAcademyContextType)

export function PokemonAcademyProvider({ children }: PokemonAcademyProviderProps) {
    const [pokemons, setPokemons] = useState<PokemonsType[]>([

        {
            id: uuidv4(),
            name: 'Bulbasauro',
            ability: 'Lança folhas',
            cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            type: 'Grama'
        },
        {
            id: uuidv4(),
            name: 'Bulbasauro',
            ability: 'Lança folhas',
            cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            type: 'Grama'
        },
        {
            id: uuidv4(),
            name: 'Bulbasauro',
            ability: 'Lança folhas',
            cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            type: 'Grama'
        },
        {
            id: uuidv4(),
            name: 'Bulbasauro',
            ability: 'Lança folhas',
            cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            type: 'Grama'
        },
        {
            id: uuidv4(),
            name: 'Bulbasauro',
            ability: 'Lança folhas',
            cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            type: 'Grama'
        },
        {
            id: uuidv4(),
            name: 'Bulbasauro',
            ability: 'Lança folhas',
            cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            type: 'Grama'
        },
        {
            id: uuidv4(),
            name: 'Bulbasauro',
            ability: 'Lança folhas',
            cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            type: 'Grama'
        },
        {
            id: uuidv4(),
            name: 'Bulbasauro',
            ability: 'Lança folhas',
            cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            type: 'Grama'
        },
        {
            id: uuidv4(),
            name: 'Bulbasauro',
            ability: 'Lança folhas',
            cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            type: 'Grama'
        },
        {
            id: uuidv4(),
            name: 'Bulbasauro',
            ability: 'Lança folhas',
            cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            type: 'Grama'
        },
        {
            id: uuidv4(),
            name: 'Bulbasauro',
            ability: 'Lança folhas',
            cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            type: 'Grama'
        },
        {
            id: uuidv4(),
            name: 'Bulbasauro',
            ability: 'Lança folhas',
            cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            type: 'Grama'
        }
    ])
    const [trainers, setTrainers] = useState<TrainerType[]>([
        {
            id: uuidv4(),
            age: 28,
            cityOfBirth: 'Palmas',
            name: 'Matheus Magno',
            pokemons: [{
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: 'Lança folhas',
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                type: 'Grama'
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: 'Lança folhas',
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                type: 'Grama'
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: 'Lança folhas',
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                type: 'Grama'
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: 'Lança folhas',
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                type: 'Grama'
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: 'Lança folhas',
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                type: 'Grama'
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: 'Lança folhas',
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                type: 'Grama'
            },
            ]
        },
        {
            id: uuidv4(),
            age: 25,
            cityOfBirth: 'Florianópolis',
            name: 'Newton',
            pokemons: [{
                id: uuidv4(),
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
                id: uuidv4(),
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
                id: uuidv4(),
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
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: 'Lança folhas',
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                type: 'Grama'
            }]
        },
    ])
    const [trainerToSearch, SetTrainerToSearch] = useState<TrainerType[]>([])
    // console.log(trainers, "context");

    function createTrainer(data: TrainerType) {
        const { age, cityOfBirth, name, pokemons } = data
        if (pokemons) {

            console.log("tem pokemons");
        }
        else {
            const newTrainer: TrainerType = {
                age,
                cityOfBirth,
                name,
                id: uuidv4()
            }
            setTrainers((state) => [newTrainer, ...state])
        }
    }
    const deleteTrainer = (trainerToDelete: TrainerType) => {
        setTrainers(
            trainers.filter(
                (trainer) => trainer.id !== trainerToDelete.id,
            ),
        );
        // fetchTransactions();
    };

    function searchTrainerByName(data: TrainerType) {
        const query = data.name
        SetTrainerToSearch(
            trainers.filter((data) => data.name === query)
        );
    }
    return (
        <PokemonAcademyContext.Provider value={{
            trainers, setTrainers, pokemons,
            setPokemons, createTrainer, deleteTrainer,
            searchTrainerByName, trainerToSearch
        }}>
            {children}
        </PokemonAcademyContext.Provider>
    )
}