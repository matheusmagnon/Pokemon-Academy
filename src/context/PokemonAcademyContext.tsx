import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { api } from "../lib/axios";

export interface PokemonType {
    id?: number;
    name: string;
    types: string[];
    ability: string[];
    cover: string;
    isChecked?: boolean;
}

export interface TrainerType {
    id?: string;
    name: string;
    age: number;
    cityOfBirth: string;
    pokemons?: PokemonType[]
}

interface PokemonAcademyContextType {
    trainers: TrainerType[];
    setTrainers: Dispatch<SetStateAction<TrainerType[]>>;
    createTrainer: (data: TrainerType) => void
    deleteTrainer: (trainerToDelete: TrainerType) => void;
    searchTrainerByName: (data: TrainerType) => void;
    updateTrainer: (trainerToUpdate: TrainerType, data: TrainerType) => void;
    trainerToSearch: TrainerType[];
    pokemonsOfTrainer: PokemonType[];
    // setPokemonsOfTrainer: Dispatch<SetStateAction<PokemonsType[]>>;
    // Dispatch<SetStateAction<PokemonsType[]>>
    currentPokemons: PokemonType[];
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    setOffset: Dispatch<SetStateAction<number>>;
    cPage: number;
    setCPage: Dispatch<SetStateAction<number>>;
    totalPages: number;
    setCurrentPokemons: Dispatch<SetStateAction<PokemonType[]>>;
    setState: Dispatch<SetStateAction<number>>;
    state: number;
    fetchPokemons: (currentPage: number) => Promise<void>;
    addPokemonToTrainer: (pokemon: PokemonType) => void;

}

interface PokemonAcademyProviderProps {
    children: ReactNode
}

export const PokemonAcademyContext = createContext({} as PokemonAcademyContextType)

export function PokemonAcademyProvider({ children }: PokemonAcademyProviderProps) {
    const [currentPokemons, setCurrentPokemons] = useState<PokemonType[]>([])
    const [pokemonsOfTrainer, setPokemonsOfTrainer] = useState<PokemonType[]>([

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
        // {
        //     id: uuidv4(),
        //     age: 28,
        //     cityOfBirth: 'Palmas',
        //     name: 'Matheus Magno',
        //     pokemons: [{
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },]
        // },
        // {
        //     id: uuidv4(),
        //     age: 25,
        //     cityOfBirth: 'Florianópolis',
        //     name: 'Newton',
        //     pokemons: [{
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },]
        // },
        // {
        //     id: uuidv4(),
        //     age: 25,
        //     cityOfBirth: 'São Luiz',
        //     name: 'João Uzumaki',
        //     pokemons: [{
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },]
        // },
        // {
        //     id: uuidv4(),
        //     age: 18,
        //     cityOfBirth: 'Rose',
        //     name: 'Rock Lee',
        //     pokemons: [{
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },
        //     {
        //         id: uuidv4(),
        //         name: 'Bulbasauro',
        //         ability: ["overgrow", "chlorophyll"],
        //         cover: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        //         types: ["grass", "poison"]
        //     },]
        // },
    ])
    const [trainerToSearch, SetTrainerToSearch] = useState<TrainerType[]>([])
    const [offset, setOffset] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [cPage, setCPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [state, setState] = useState(0)
    //const [pokemonIsChecked, setPokemonIsChecked] = useState<boolean>()
    const fetchPokemons = async (currentPage: number) => {
        const limitPerPage = 6

        setOffset(currentPage * limitPerPage - limitPerPage)

        // envia current page = 2 * limitPerPage = offset 

        //ponto de partida da proxima paginaçao
        //    const  offset = limitPerPage + 6

        // offset + 1 / limitPerPage = current page
        // console.log("offset", offset);

        const data = ((await api.get(`?limit=${limitPerPage}&offset=${offset}`)).data);
        const totalRegisters = data.count
        setTotalPages(Math.ceil(totalRegisters / limitPerPage))

        // const nextPage = data.next

        // console.log(nextPage);
        // console.log(data);

        // ?offset=12&limit=6

        // console.log("total registros", totalRegisters);
        // console.log("total pages", totalPages);
        // console.log("registers per page", limitPerPage);
        // console.log("current page", Math.ceil(offset + 1 / limitPerPage))


        // function createPokemonObject(results) {

        const promises: any[] = [];
        data.results.forEach(async (pokemon) => {
            promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then((res) => res.json()));
        })

        Promise.all(promises).then((pokemonsOfAPI) => {
            const newPokemons = pokemonsOfAPI?.map((pokemonOfAPI) => (
                {
                    name: pokemonOfAPI.name,
                    cover: pokemonOfAPI.sprites['front_default'],
                    types: pokemonOfAPI.types.map((type: { type: { name: string; }; }) => type.type.name),
                    id: pokemonOfAPI.id,
                    ability: pokemonOfAPI.abilities.map((ability: { ability: { name: string; }; }) => ability.ability.name),
                    isChecked: pokemonsOfTrainer?.some((pokemonOfTrainer) => { return (pokemonOfTrainer.name == pokemonOfAPI.name) })
                }
            ));
            setCurrentPokemons(newPokemons)
        });
    }

    useEffect(() => {
        fetchPokemons(cPage)
    }, [cPage, currentPage, state]);

    // console.log(currentPokemons);

    // console.log(currentPage);

    // console.log(currentPokemons);
    // console.log(dataFetch);

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

    function addPokemonToTrainer(pokemon: PokemonType) {
        const newPokemon: PokemonType = {
            ability: pokemon.ability,
            cover: pokemon.cover,
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types,
            isChecked: true
        }

        if (pokemonsOfTrainer.length < 6) {
            console.log("tt");

            if (pokemonsOfTrainer?.length == 0) {
                setPokemonsOfTrainer([...pokemonsOfTrainer, newPokemon])
                console.log(newPokemon.name, 'inedito');
            }

            //Se já existir valor percorre o array para verificar se o valor ja existe
            if (pokemonsOfTrainer?.length > 0) {
                if (!pokemonsOfTrainer.map(pokemonOftrainer => pokemonOftrainer.id).includes(newPokemon.id)) {
                    setPokemonsOfTrainer([...pokemonsOfTrainer, newPokemon]);
                    //state.list.push(action.payload)
                }
                else {
                    setPokemonsOfTrainer(
                        pokemonsOfTrainer.filter(
                            (pokemonOftrainer) => pokemonOftrainer.id !== newPokemon.id,
                        ),
                    );
                }
            }
        } else {
            //alert("Você já tem 6 pokemons")
            setPokemonsOfTrainer(
                pokemonsOfTrainer.filter(
                    (pokemonOftrainer) => pokemonOftrainer.id !== newPokemon.id,
                ),
            );
        }
    }
    useEffect(() => {
        console.log(pokemonsOfTrainer.length);

    }, [pokemonsOfTrainer])
    const deleteTrainer = (trainerToDelete: TrainerType) => {
        setTrainers(
            trainers.filter(
                (trainer) => trainer.id !== trainerToDelete.id,
            ),
        );
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
    console.log("pokemonTrainer", pokemonsOfTrainer);
    return (
        <PokemonAcademyContext.Provider value={{
            addPokemonToTrainer,
            fetchPokemons,
            state,
            setState,
            setCurrentPokemons,
            totalPages,
            cPage,
            setCPage,
            setOffset,
            setCurrentPage,
            currentPage,
            currentPokemons,
            updateTrainer,
            trainers, setTrainers, pokemonsOfTrainer,
            createTrainer, deleteTrainer,
            searchTrainerByName, trainerToSearch
        }}>
            {children}
        </PokemonAcademyContext.Provider>
    )
}