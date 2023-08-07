import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

import { api } from "../lib/axios";

export interface PokemonType {
    id?: number;
    name: string;
    types: string[];
    ability: string[];
    cover: string;
    isChecked?: false;
}

export interface TrainerType {
    id?: string;
    name?: string;
    age?: number;
    cityOfBirth?: string;
    pokemons?: PokemonType[]
}

interface PokemonAcademyContextType {
    trainers: TrainerType[];
    setTrainers: Dispatch<SetStateAction<TrainerType[]>>;
    createNameTrainer: (name: TrainerType) => void
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
    fetchPokemonsByPage: (currentPage: number) => Promise<void>;
    addPokemonToTrainer: (pokemon: PokemonType) => void;
    currentTrainer: TrainerType;
    createAgeTrainer: (age: TrainerType) => void
    createCityOfBithTrainer: (city: TrainerType) => void
    createTrainer: (currentTrainer: TrainerType) => void
    deletePokemonOfTrainer: (pokemonOfTrainerToDelete: PokemonType) => void
    setPokemonSearch: Dispatch<SetStateAction<string>>;
    fetchPokemonByName: (name: string) => void
    pokemonSearch: PokemonType;
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

    ])
    const [currentTrainer, setCurrentTrainer] = useState<TrainerType>({})
    const [trainerToSearch, SetTrainerToSearch] = useState<TrainerType[]>([])
    const [offset, setOffset] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [cPage, setCPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [state, setState] = useState(0)
    const [pokemonSearch, setPokemonSearch] = useState<PokemonType>()
    const fetchPokemonsByPage = async (currentPage?: number) => {
        const limitPerPage = 6
        setOffset(currentPage * limitPerPage - limitPerPage)
        const data = ((await api.get(`?limit=${limitPerPage}&offset=${offset}`)).data);
        const totalRegisters = data.count
        setTotalPages(Math.ceil(totalRegisters / limitPerPage))

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

    const fetchPokemonByName = async (nameOfPokemon: string) => {


        try {
            const pokemonSearch = await (fetch(`https://pokeapi.co/api/v2/pokemon/${nameOfPokemon}`)
                .then((res) => res.json()))
            console.log(pokemonSearch);
            const newPokemon =
            {
                name: pokemonSearch.name,
                cover: pokemonSearch.sprites['front_default'],
                types: pokemonSearch.types.map((type: { type: { name: string; }; }) => type.type.name),
                id: pokemonSearch.id,
                ability: pokemonSearch.abilities.map((ability: { ability: { name: string; }; }) => ability.ability.name),
                isChecked: pokemonsOfTrainer?.some((pokemonOfTrainer) => { return (pokemonOfTrainer.name == pokemonSearch.name) })
            }

            setCurrentPokemons([newPokemon])
            setPokemonSearch(newPokemon)

        } catch (error) {
            alert('Pokemon não existe!')
        }
    }

    useEffect(() => {
        fetchPokemonsByPage(cPage)
    }, [cPage, currentPage]);

    useEffect(() => {
        if (currentPokemons.length > 1) {
            fetchPokemonsByPage(currentPage)
        }
        if (currentPokemons.length == 1) {
            fetchPokemonByName(pokemonSearch?.name)
        }

    }, [currentTrainer])


    console.log(pokemonSearch);

    function createTrainer(currentTrainer: TrainerType) {
        setTrainers([...trainers, currentTrainer])
        setPokemonsOfTrainer([])
        setCurrentTrainer({})
        fetchPokemonsByPage(currentPage)
    }

    function createNameTrainer(name: string) {
        setCurrentTrainer({ ...currentTrainer, name: name });
    }
    function createAgeTrainer(age: number) {
        setCurrentTrainer({ ...currentTrainer, age: age })
    }

    function createCityOfBithTrainer(city: string) {
        setCurrentTrainer({ ...currentTrainer, cityOfBirth: city })
    }

    //checkbox não est
    function addPokemonToTrainer(pokemon: PokemonType) {
        const newPokemon: PokemonType = {
            ability: pokemon.ability,
            cover: pokemon.cover,
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types,
            // isChecked: true
        }

        if (pokemonsOfTrainer.length < 6) {
            if (pokemonsOfTrainer?.length == 0) {
                setPokemonsOfTrainer([...pokemonsOfTrainer, newPokemon])
            }

            //Se já existir valor percorre o array para verificar se o valor ja existe
            if (pokemonsOfTrainer?.length > 0) {
                if (!pokemonsOfTrainer.map(pokemonOftrainer => pokemonOftrainer.id).includes(newPokemon.id)) {
                    setPokemonsOfTrainer([...pokemonsOfTrainer, newPokemon]);
                    setPokemonSearch(undefined)
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
            if (!pokemonsOfTrainer.map(pokemonOftrainer => pokemonOftrainer.id).includes(newPokemon.id)) {
                alert("Você não pode ter mais que tem 6 pokemons")
            }

            setPokemonsOfTrainer(
                pokemonsOfTrainer.filter(
                    (pokemonOftrainer) => pokemonOftrainer.id !== newPokemon.id,
                ),
            );
        }
    }
    useEffect(() => {
        setCurrentTrainer({
            ...currentTrainer,
            pokemons: pokemonsOfTrainer
        })
    }, [pokemonsOfTrainer])


    const deletePokemonOfTrainer = (pokemonsOfTrainerToDelete: PokemonType) => {

        setTrainers(trainers.map((trainer) => {
            return { ...trainer, pokemons: [...trainer.pokemons.filter((pokemon) => pokemon.name !== pokemonsOfTrainerToDelete.name)] }
        }))
    }

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
    console.log("currentTrainer", currentTrainer);
    console.log("current Pokemons", pokemonsOfTrainer);

    return (
        <PokemonAcademyContext.Provider value={{
            addPokemonToTrainer,
            fetchPokemonsByPage,
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
            createAgeTrainer,
            createTrainer,
            deletePokemonOfTrainer,
            createCityOfBithTrainer, currentTrainer, pokemonSearch,
            createNameTrainer, deleteTrainer, fetchPokemonByName,
            searchTrainerByName, trainerToSearch
        }}>
            {children}
        </PokemonAcademyContext.Provider>
    )
}