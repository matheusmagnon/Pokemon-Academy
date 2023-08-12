/* eslint-disable react/react-in-jsx-scope */
import { createContext, useEffect, useState } from 'react';

import { PokemonAcademyContextType, PokemonAcademyProviderProps, PokemonType, TrainerType } from '../types/types';


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

    const fetchPokemonsByPage = async (currentPage: number) => {
        const limitPerPage = 6;
        setOffset(currentPage * limitPerPage - limitPerPage);
        const data = ((await api.get(`?limit=${limitPerPage}&offset=${offset}`)).data);
        const totalRegisters = data.count;
        setTotalPages(Math.ceil(totalRegisters / limitPerPage));

        const promises: any[] = [];
        data.results.forEach(async (pokemon: PokemonType[]) => {
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

        } catch (error) {
            console.log(error);

            alert('Pokemon não existe!');
        }
    };

    //set page
    useEffect(() => {
        fetchPokemonsByPage(cPage);
    }, [cPage, currentPage]);

    //set fetch page
    useEffect(() => {
        if (currentPokemons.length > 1) {
            fetchPokemonsByPage(currentPage);
        }
        if (currentPokemons.length == 1) {

            fetchPokemonByName(currentPokemons[0].name);
        }

    }, [currentTrainer]);


    function createTrainer(currentTrainer: TrainerType) {
        setTrainers([...trainers, currentTrainer]);
        setPokemonsOfTrainer([]);
        setCurrentTrainer({});
        resetSearchTrainer()
        setTrainerToSearch([])
        setCurrentPage(1)
        fetchPokemonsByPage(1)
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

    function addPokemonToTrainerCurrentTrainer(pokemon: PokemonType) {

        const newPokemon: PokemonType = {
            ability: pokemon.ability,
            cover: pokemon.cover,
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types,
        };
        //PokemonsOfTrainer is all checked pokemons
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

    //return new array of trainer's pokemons
    function addPokemonToTrainer(trainer: TrainerType, pokemon: PokemonType) {
        const newPokemon: PokemonType = {
            ability: pokemon.ability,
            cover: pokemon.cover,
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types,
        };

        const newPokemonsOfTrainer = () => {
            if (trainer?.pokemons?.length != undefined && trainer.pokemons.length < 6) {

                if (trainer.pokemons?.length == 0) {
                    return [...trainer.pokemons, newPokemon]
                }

                //Se já existir valor percorre o array para verificar se o valor ja existe
                if (trainer?.pokemons?.length != undefined && trainer.pokemons.length > 0) {
                    if (!trainer?.pokemons?.map(pokemonOftrainer => pokemonOftrainer.id).includes(newPokemon.id)) {
                        return [...trainer.pokemons, newPokemon]
                        // setPokemonSearch(undefined);
                    }
                    else {
                        return [trainer.pokemons?.filter(
                            (pokemonOftrainer) => pokemonOftrainer.id !== newPokemon.id)]

                    }
                }
            } else {
                if (!trainer.pokemons?.map(pokemonOftrainer => pokemonOftrainer.id).includes(newPokemon.id)) {
                    alert('Você não pode ter mais que tem 6 pokemons');
                }

                return [
                    trainer.pokemons?.filter(
                        (pokemonOftrainer) => pokemonOftrainer.id !== newPokemon.id,
                    ),
                ]
            }
        }
        const newPokemons: PokemonType[] = newPokemonsOfTrainer()
        const newTrainer: TrainerType = { ...trainer, pokemons: newPokemons }
        updateTrainer(trainer, newTrainer)
        fetchPokemonsByPage(1)
    }

    useEffect(() => {
        setCurrentTrainer({
            ...currentTrainer,
            pokemons: pokemonsOfTrainer
        });
    }, [pokemonsOfTrainer]);


    const deletePokemonOfTrainer = (pokemonsOfTrainerToDelete: PokemonType) => {
        setTrainers(trainers.map((trainer) => {
            return { ...trainer, pokemons: [...trainer?.pokemons?.filter((pokemon) => pokemon.name !== pokemonsOfTrainerToDelete.name)] };
        }));
    };

    const deleteTrainer = (trainerToDelete: TrainerType) => {
        console.log('tt', trainerToDelete);

        setTrainers(
            trainers.filter(
                (trainer) => trainer.id !== trainerToDelete.id,
            ),
        );
    };

    function searchTrainerByName(data: TrainerType) {
        const query = data.name;
        if (trainers.some(trainer => trainer.name == data.name)) {
            console.log(data.name);
            setTrainerToSearch(
                trainers.filter((data) => data.name === query)
            );
        }
        else {
            alert('Treinador não entontrado');
        }
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
                if (newData.age != undefined && isNaN(newData.age)) {
                    newData.age = trainer.age;
                }
                if (newData.cityOfBirth == '') {
                    newData.cityOfBirth = trainer.cityOfBirth;
                }
                if (newData.pokemons?.length != undefined && newData.pokemons?.length > 0) {
                    if (!trainerToUpdate.pokemons?.map(pokemonOftrainer => pokemonOftrainer.id)
                        .includes(currentPokemons[0].id)) {
                        return {
                            ...trainerToUpdate,
                            pokemons:
                                [...trainerToUpdate?.pokemons
                                    , currentPokemons[0]]
                        };
                    }
                    alert("Já existe pokemon com esse cadastro!")
                }
                return {
                    ...trainer, name: newData.name, age: newData?.age,
                    cityOfBirth: newData?.cityOfBirth
                };

            }
            return trainer;
        });

        setTrainers(newTrainers);

    };
    return (
        <PokemonAcademyContext.Provider value={{
            addPokemonToTrainer,
            addPokemonToTrainerCurrentTrainer,
            fetchPokemonsByPage,
            setCurrentPokemons,
            totalPages,
            cPage,
            setCPage,
            setOffset,
            setCurrentPage,
            currentPage,
            currentPokemons,
            updateTrainer,
            trainers,
            pokemonsOfTrainer,
            createAgeTrainer,
            createTrainer,
            deletePokemonOfTrainer,
            createCityOfBithTrainer,
            currentTrainer,
            createNameTrainer,
            deleteTrainer,
            fetchPokemonByName,
            searchTrainerByName,
            trainerToSearch,
            resetSearchTrainer,
        }}>
            {children}
        </PokemonAcademyContext.Provider>
    );
}