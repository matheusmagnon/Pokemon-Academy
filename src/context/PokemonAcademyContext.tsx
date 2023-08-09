/* eslint-disable react/react-in-jsx-scope */
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

import { api } from '../lib/axios';

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
    setPokemonSearch: Dispatch<SetStateAction<string>>
    fetchPokemonByName: (name: string) => void
    pokemonSearch: PokemonType;
    resetPokemonSearch: () => void
    isMobile: boolean;
    resetSearchTrainer: () => void;

}

interface PokemonAcademyProviderProps {
    children: ReactNode
}

export const PokemonAcademyContext = createContext({} as PokemonAcademyContextType);

export function PokemonAcademyProvider({ children }: PokemonAcademyProviderProps) {
    const [currentPokemons, setCurrentPokemons] = useState<PokemonType[]>([]);
    const [pokemonsOfTrainer, setPokemonsOfTrainer] = useState<PokemonType[]>([]);
    const [trainers, setTrainers] = useState<TrainerType[]>([]);
    const [currentTrainer, setCurrentTrainer] = useState<TrainerType>({});
    const [trainerToSearch, setTrainerToSearch] = useState<TrainerType[]>([]);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [cPage, setCPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [state, setState] = useState(0);
    const [pokemonSearch, setPokemonSearch] = useState<PokemonType>();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const initialSearchPokemon = {
        id: 0,
        name: "",
        types: [],
        ability: [],
        cover: '',
        isChecked: false,
    }

    useEffect(() => {
        const resolution = window.innerWidth;
        setIsMobile(resolution >= 290 && resolution <= 480)
    }, [])

    const fetchPokemonsByPage = async (currentPage?: number) => {
        const limitPerPage = 6;
        setOffset(currentPage * limitPerPage - limitPerPage);
        const data = ((await api.get(`?limit=${limitPerPage}&offset=${offset}`)).data);
        const totalRegisters = data.count;
        setTotalPages(Math.ceil(totalRegisters / limitPerPage));

        const promises: any[] = [];
        data.results.forEach(async (pokemon) => {
            promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then((res) => res.json()));
        });

        Promise.all(promises).then((pokemonsOfAPI) => {
            const newPokemons = pokemonsOfAPI?.map((pokemonOfAPI) => (
                {
                    name: pokemonOfAPI.name,
                    cover: pokemonOfAPI.sprites['front_default'],
                    types: pokemonOfAPI.types.map((type: { type: { name: string; }; }) => type.type.name),
                    id: pokemonOfAPI.id,
                    ability: pokemonOfAPI.abilities.map((ability: { ability: { name: string; }; }) => ability.ability.name),
                    isChecked: pokemonsOfTrainer?.some((pokemonOfTrainer) => { return (pokemonOfTrainer.name == pokemonOfAPI.name); })
                }
            ));
            setCurrentPokemons(newPokemons);
        });
    };


    const fetchPokemonByName = async (nameOfPokemon: string) => {
        try {
            const pokemonSearch = await (fetch(`https://pokeapi.co/api/v2/pokemon/${nameOfPokemon}`)
                .then((res) => res.json()));
            console.log(pokemonSearch);
            const newPokemon =
            {
                name: pokemonSearch.name,
                cover: pokemonSearch.sprites['front_default'],
                types: pokemonSearch.types.map((type: { type: { name: string; }; }) => type.type.name),
                id: pokemonSearch.id,
                ability: pokemonSearch.abilities.map((ability: { ability: { name: string; }; }) => ability.ability.name),
                isChecked: pokemonsOfTrainer?.some((pokemonOfTrainer) => { return (pokemonOfTrainer.name == pokemonSearch.name); })
            };

            setCurrentPokemons([newPokemon]);
            setPokemonSearch(newPokemon);

        } catch (error) {
            console.log(error);

            alert('Pokemon não existe!');
        }
    };

    useEffect(() => {
        fetchPokemonsByPage(cPage);
    }, [cPage, currentPage]);

    useEffect(() => {
        if (currentPokemons.length > 1) {
            fetchPokemonsByPage(currentPage);
        }
        if (currentPokemons.length == 1) {
            fetchPokemonByName(pokemonSearch?.name);
        }

    }, [currentTrainer]);


    function createTrainer(currentTrainer: TrainerType) {
        setTrainers([...trainers, currentTrainer]);
        setPokemonsOfTrainer([]);
        setCurrentTrainer({});
        fetchPokemonsByPage(currentPage);
        resetSearchTrainer()
    }

    function createNameTrainer(name: string) {
        setCurrentTrainer({ ...currentTrainer, name: name });
    }
    function createAgeTrainer(age: number) {
        setCurrentTrainer({ ...currentTrainer, age: age });
    }

    function createCityOfBithTrainer(city: string) {
        setCurrentTrainer({ ...currentTrainer, cityOfBirth: city });
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
        };

        if (pokemonsOfTrainer.length < 6) {
            if (pokemonsOfTrainer?.length == 0) {
                setPokemonsOfTrainer([...pokemonsOfTrainer, newPokemon]);
            }

            //Se já existir valor percorre o array para verificar se o valor ja existe
            if (pokemonsOfTrainer?.length > 0) {
                if (!pokemonsOfTrainer.map(pokemonOftrainer => pokemonOftrainer.id).includes(newPokemon.id)) {
                    setPokemonsOfTrainer([...pokemonsOfTrainer, newPokemon]);
                    // setPokemonSearch(undefined);
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
                alert('Você não pode ter mais que tem 6 pokemons');
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
        });
    }, [pokemonsOfTrainer]);


    const deletePokemonOfTrainer = (pokemonsOfTrainerToDelete: PokemonType) => {
        setTrainers(trainers.map((trainer) => {
            return { ...trainer, pokemons: [...trainer.pokemons.filter((pokemon) => pokemon.name !== pokemonsOfTrainerToDelete.name)] };
        }));
    };

    const deleteTrainer = (trainerToDelete: TrainerType) => {
        setTrainers(
            trainers.filter(
                (trainer) => trainer.id !== trainerToDelete.id,
            ),
        );
    };

    function searchTrainerByName(data: TrainerType) {
        const query = data.name;
        setTrainerToSearch(
            trainers.filter((data) => data.name === query)
        );
    }

    function resetSearchTrainer() {
        setTrainerToSearch(trainers)
    }

    const updateTrainer = (trainerToUpdate: TrainerType, newData: TrainerType) => {
        const newTrainers = trainers.map((trainer) => {
            if (trainer.id === trainerToUpdate.id) {
                if (newData.name == '') {
                    newData.name = trainer.name;
                }
                if (isNaN(newData.age)) {
                    newData.age = trainer.age;
                }
                if (newData.cityOfBirth == '') {
                    newData.cityOfBirth = trainer.cityOfBirth;
                }
                if (newData.pokemons?.length > 0) {
                    if (!trainerToUpdate.pokemons?.map(pokemonOftrainer => pokemonOftrainer.id).includes(pokemonSearch.id)) {
                        return {
                            ...trainerToUpdate,
                            pokemons:
                                [...trainerToUpdate?.pokemons
                                    , pokemonSearch]
                        };
                    }
                    alert("Já existe pokemon com esse cadastro!")
                    // newData.pokemons = trainer.pokemons
                }
                return {
                    ...trainer, name: newData.name, age: newData?.age,
                    cityOfBirth: newData?.cityOfBirth
                    // pokemons: newData?.pokemons
                };

            }
            return trainer;
        });

        setTrainers(newTrainers);
        resetPokemonSearch()
    };

    const resetPokemonSearch = () => {
        console.log('reset');

        setPokemonSearch(initialSearchPokemon)
    }
    console.log('currentTrainer', currentTrainer);
    console.log('current Pokemons', pokemonsOfTrainer);

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
            resetPokemonSearch,
            createTrainer,
            setPokemonSearch,
            deletePokemonOfTrainer,
            createCityOfBithTrainer,
            currentTrainer,
            pokemonSearch,
            createNameTrainer,
            deleteTrainer,
            fetchPokemonByName,
            searchTrainerByName,
            trainerToSearch,
            resetSearchTrainer,
            isMobile
        }}>
            {children}
        </PokemonAcademyContext.Provider>
    );
}