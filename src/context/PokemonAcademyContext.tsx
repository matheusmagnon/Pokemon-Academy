import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { api } from "../lib/axios";

export interface PokemonsType {
    id?: string;
    name: string;
    types: string[];
    ability: string[];
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
    updateTrainer: (trainerToUpdate: TrainerType, data: TrainerType) => void;
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

        // {
        //     id: uuidv4(),
        //     name: 'Bulbasauro',
        //     ability: ["overgrow", "chlorophyll"],
        //     cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //     types: ["grass", "poison"]
        // },
        // {
        //     id: uuidv4(),
        //     name: 'Bulbasauro',
        //     ability: ["overgrow", "chlorophyll"],
        //     cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //     types: ["grass", "poison"]
        // },
        // {
        //     id: uuidv4(),
        //     name: 'Bulbasauro',
        //     ability: ["overgrow", "chlorophyll"],
        //     cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //     types: ["grass", "poison"]
        // },
        // {
        //     id: uuidv4(),
        //     name: 'Bulbasauro',
        //     ability: ["overgrow", "chlorophyll"],
        //     cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //     types: ["grass", "poison"]
        // },
        // {
        //     id: uuidv4(),
        //     name: 'Bulbasauro',
        //     ability: ["overgrow", "chlorophyll"],
        //     cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //     types: ["grass", "poison"]
        // },
        // {
        //     id: uuidv4(),
        //     name: 'Bulbasauro',
        //     ability: ["overgrow", "chlorophyll"],
        //     cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //     types: ["grass", "poison"]
        // },
        // {
        //     id: uuidv4(),
        //     name: 'Bulbasauro',
        //     ability: ["overgrow", "chlorophyll"],
        //     cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //     types: ["grass", "poison"]
        // },
        // {
        //     id: uuidv4(),
        //     name: 'Bulbasauro',
        //     ability: ["overgrow", "chlorophyll"],
        //     cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //     types: ["grass", "poison"]
        // },
        // {
        //     id: uuidv4(),
        //     name: 'Bulbasauro',
        //     ability: ["overgrow", "chlorophyll"],
        //     cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //     types: ["grass", "poison"]
        // },
        // {
        //     id: uuidv4(),
        //     name: 'Bulbasauro',
        //     ability: ["overgrow", "chlorophyll"],
        //     cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //     types: ["grass", "poison"]
        // },
        // {
        //     id: uuidv4(),
        //     name: 'Bulbasauro',
        //     ability: ["overgrow", "chlorophyll"],
        //     cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //     types: ["grass"]
        // },
        // {
        //     id: uuidv4(),
        //     name: 'Bulbasauro',
        //     ability: ["overgrow", "chlorophyll"],
        //     cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //     types: ["grass", "poison"]
        // },
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
                ability: ["overgrow", "chlorophyll", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },]
        },
        {
            id: uuidv4(),
            age: 25,
            cityOfBirth: 'Florianópolis',
            name: 'Newton',
            pokemons: [{
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },]
        },
        {
            id: uuidv4(),
            age: 25,
            cityOfBirth: 'São Luiz',
            name: 'João Uzumaki',
            pokemons: [{
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },]
        },
        {
            id: uuidv4(),
            age: 18,
            cityOfBirth: 'Rose',
            name: 'Rock Lee',
            pokemons: [{
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },
            {
                id: uuidv4(),
                name: 'Bulbasauro',
                ability: ["overgrow", "chlorophyll"],
                cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                types: ["grass", "poison"]
            },]
        },
    ])
    const [trainerToSearch, SetTrainerToSearch] = useState<TrainerType[]>([])
    const [dataFetch, setDataFetch] = useState();
    const fetchPokemons = async () => {
        const promises = [];
        for (let i = 1; i <= 7; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then((res) => res.json()));
        }
        Promise.all(promises).then((results) => {
            const pokemons = results.map((result) => ({
                name: result.name,
                cover: result.sprites['front_default'],
                types: result.types.map((type) => type.type.name),
                id: uuidv4(),
                ability: result.abilities.map((ability) => ability.ability.name)
            }));
            setPokemons(pokemons)

            // id: string;
            // name: string;
            // types: string[];
            // ability: string[];
            // cover: string;




        });
        // const data = ((await api.get('')).data);
        // const count = (data.count);
        // console.log(data);

        // console.log(count);


        // for (let i = 1; i <= 1; i++) {
        //     arr.push((await api.get(`${i}`)).data)
        //     // console.log(arr.length);
        // }

        // arr.map((arr) => {
        //     console.log(arr.);

        // })

        // const newPokemons = arr.map((pokemons) => {

        //     return {
        //         ...pokemons, name: pokemons.name, types: pokemons.types,
        //         ability: pokemons.abilities, cover: pokemons.sprites.front_default
        //     };


        //     return pokemons;
        // });

        // setPokemons(newPokemons);

    }
    console.log(pokemons);


    useEffect(() => {
        fetchPokemons()
    }, []);

    useEffect(() => {
        fetchPokemons()
    }, []);

    console.log(dataFetch);

    // console.log(allDataPokemon);


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

    const updateTrainer = (trainerToUpdate: TrainerType, data: TrainerType) => {
        const newTrainers = trainers.map((trainer) => {
            if (trainer.id === trainerToUpdate.id) {
                if (data.name == '') {
                    data.name = trainer.name
                }
                if (isNaN(data.age)) {
                    data.age = trainer.age
                }
                if (data.cityOfBirth == '') {
                    data.cityOfBirth = trainer.cityOfBirth
                }
                if (data.pokemons == undefined) {
                    data.pokemons = trainer.pokemons
                }
                return {
                    ...trainer, name: data.name, age: data?.age,
                    cityOfBirth: data?.cityOfBirth, pokemons: data?.pokemons
                };

            }
            return trainer;
        });

        setTrainers(newTrainers);
    }
    return (
        <PokemonAcademyContext.Provider value={{
            updateTrainer,
            trainers, setTrainers, pokemons,
            setPokemons, createTrainer, deleteTrainer,
            searchTrainerByName, trainerToSearch
        }}>
            {children}
        </PokemonAcademyContext.Provider>
    )
}