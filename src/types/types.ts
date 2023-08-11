import { Dispatch, ReactNode, SetStateAction } from 'react';

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
  pokemons?: PokemonType[];
}

export interface PokemonAcademyContextType {
  currentTrainer: TrainerType;
  addPokemonToTrainerCurrentTrainer: (pokemon: PokemonType) => void;
  addPokemonToTrainer: (trainerToUpdate: TrainerType, pokemon: PokemonType) => void;
  createTrainer: (currentTrainer: TrainerType) => void;
  trainers: TrainerType[];
  createNameTrainer: (name: string) => void;
  createAgeTrainer: (age: number) => void;
  createCityOfBithTrainer: (city: string) => void;
  updateTrainer: (trainerToUpdate: TrainerType, data: TrainerType) => void;
  deleteTrainer: (trainerToDelete: TrainerType) => void;
  searchTrainerByName: (data: TrainerType) => void;
  resetSearchTrainer: () => void;
  trainerToSearch: TrainerType[];
  pokemonsOfTrainer: PokemonType[];
  deletePokemonOfTrainer: (pokemonOfTrainerToDelete: PokemonType) => void;

  currentPokemons: PokemonType[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
  cPage: number;
  setCPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setCurrentPokemons: Dispatch<SetStateAction<PokemonType[]>>;
  fetchPokemonsByPage: (currentPage: number) => Promise<void>;
  fetchPokemonByName: (name: string) => void;
}

export interface PokemonAcademyProviderProps {
  children: ReactNode;
}

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};
