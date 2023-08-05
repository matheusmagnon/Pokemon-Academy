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
    const [pokemonIsChecked, setPokemonIsChecked] = useState<boolean>()
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

        const promises = [];
        data.results.forEach(async (pokemon) => {
            promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then((res) => res.json()));
        })
        Promise.all(promises).then((results) => {
            const newPokemons = results?.map((result) => (
                {
                    name: result.name,
                    cover: result.sprites['front_default'],
                    types: result.types.map((type) => type.type.name),
                    id: result.id,
                    ability: result.abilities.map((ability) => ability.ability.name),
                    isChecked: pokemonsOfTrainer?.some((value) => { return (value.name == result.name) })
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

        // Entrada de dados em caso de que o Treinador Pokemon não tenha pokemons 
        if (pokemonsOfTrainer?.length == 0) {
            setPokemonsOfTrainer([...pokemonsOfTrainer, pokemon])
            console.log(pokemon.name, 'inedito');
        }

        if (pokemonsOfTrainer?.length > 0) {
            setPokemonsOfTrainer([...pokemonsOfTrainer, pokemon])
            // const newPokemon = pokemonsOfTrainer?.map((pokemonOfTrainer) => {
            // if (pokemonOfTrainer.id != pokemon.id) {
            //     console.log('existente',pokemonOfTrainer.id, 'novo'pokemon.id);
            //     setPokemonsOfTrainer([...pokemonsOfTrainer, pokemon])
            //     // return {
            //     //     ...pokemonOfTrainer, name: pokemonOfTrainer.name, ability: pokemonOfTrainer.ability,
            //     //     cover: pokemonOfTrainer.cover, id: pokemonOfTrainer.id, isChecked: pokemonOfTrainer.isChecked,
            //     //     types: pokemonOfTrainer.types
            //     // }
            // }
            // setPokemonsOfTrainer([newPokemon[0] as PokemonType])

            // const newPokemon = pokemonsOfTrainer?.map((pokemonOfTrainer) => {
            //     if (pokemon.id !== pokemonOfTrainer.id) {
            //         console.log('novo diff');
            //         return {
            //             ...pokemonOfTrainer, name: pokemonOfTrainer.name, ability: pokemonOfTrainer.ability,
            //             cover: pokemonOfTrainer.cover, id: pokemonOfTrainer.id, isChecked: pokemonOfTrainer.isChecked,
            //             types: pokemonOfTrainer.types
            //         }

            //     }
            // });

            // console.log("novo pokemon ", );

            // console.log('iguais ?');
            // console.log(pokemonsOfTrainer?.some((pokemon) => {
            //     console.log(pokemon.name[index], pokemonOfTrainer.name);

            //     return (pokemon.name == pokemonOfTrainer.name)
            // }));

            // })
        }

        // if (pokemonOfTrainer.id !== pokemon.id) {
        //     console.log('treinador', pokemonOfTrainer.id, pokemonOfTrainer.name, 'new pokemon', pokemon.id, pokemon.name);
        //     setPokemonsOfTrainer([...pokemonsOfTrainer, pokemon])

        //     // setPokemonsOfTrainer((state) => [pokemon, ...state])
        // }

        // )
        //    pokemon.id != pokemonsOfTrainer[]




        // Caso já o Treinador Pokemon já tenha pokemons
        // if (pokemonsOfTrainer.length > 0) {
        //     pokemonsOfTrainer.forEach((pokemonsOfTrainer) => {
        //         console.log(pokemonsOfTrainer);
        //     })
        // const newPokemonOfTrainer = pokemonsOfTrainer.map((pokemonOfTrainer) => {
        // Se o pokemon a ser cadastrado não tiver registro (novo registro)
        // console.log(pokemonOfTrainer.name);
        // if (pokemon.name == pokemonOfTrainer.name) {
        //     console.log(pokemon.name, 'segundo registro e mesmo registro');
        // }


        // if (Number(pokemonOfTrainer.id) >= 0) {
        //     console.log(pokemon, 'inedito');

        //     return {
        //         ...pokemonOfTrainer, name: pokemonOfTrainer.name, ability: pokemonOfTrainer.ability,
        //         cover: pokemonOfTrainer.cover, id: pokemonOfTrainer.id, isChecked: pokemonOfTrainer.isChecked,
        //         types: pokemonOfTrainer.types
        //     }
        //     // setPokemonsOfTrainer((state) => [pokemon, ...state])
        // }

        // else {
        //     console.log('Não pode add o mesmo');
        //     setPokemonsOfTrainer((state) => [pokemon, ...state])
        // }

        // })

        // console.log(newPokemonOfTrainer?.[0], 'Objeto do novo pokemon');

        // const newPokemonOfTrainerObj = newPokemonOfTrainer[0]
        // if (newPokemonOfTrainerObj){

        // }

        // console.log(typeof newPokemonOfTrainerObj, 'newPokemo');
        // console.log(typeof pokemon, 'atual');
        // setPokemonsOfTrainer(newPokemonOfTrainer?.[0])



        // }
        // fetchPokemons(currentPage)

        // setPokemonsOfTrainer((state) => [pokemon, ...state])
        // setPokemonsOfTrainer((prevState) => ...newPokemons);
        // (prevState: PokemonsType[]) => PokemonsType[]
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