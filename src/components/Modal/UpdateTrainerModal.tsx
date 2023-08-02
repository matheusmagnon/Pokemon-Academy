/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Dialog from '@radix-ui/react-dialog';
import { Trash, XCircle } from 'phosphor-react';
import { NewPokemon } from './NewPokemonModal';
import { PokemonAcademyContext, TrainerType } from '../../context/PokemonAcademyContext'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { useContext } from 'react';


// const newTrainerFormSchema = {
//     name: yup.string(),
//     age: yup.number(),
//     citeOfBirth: yup.string(),
// }
interface UpdateTrainerProps {
    trainerToUpdate: TrainerType
}


export function UpdateTrainerModal({ trainerToUpdate }: UpdateTrainerProps) {

    const { trainers, setTrainers } = useContext(PokemonAcademyContext)

    const { register, handleSubmit, reset } = useForm<TrainerType>()

    function handleUpdateTrainer(data: TrainerType) {
        console.log(trainerToUpdate);
        console.log(data);

        const updateTrainer = (data: TrainerType) => {
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
            reset()
        }
        updateTrainer(data)
    }
    return (
        <Dialog.Portal className="align-middle">
            <Dialog.Overlay className="fixed inset-0 bg-white/40" />
            <Dialog.Content className="fixed  w-1/2 h-fit top-96 -translate-y-96 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 p-4 shadow">
                <div className='flex justify-between items-center pb-4'>
                    <Dialog.Title className="font-bold text-xl text-gray-100">Edite as informações</Dialog.Title>
                    <Dialog.Close>
                        <XCircle size={28} className='text-gray-100' />
                    </Dialog.Close>
                </div>
                <form onSubmit={handleSubmit(handleUpdateTrainer)} className='flex flex-col'>
                    <div className=' flex flex-col space-y-2 '>
                        <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                            type="text"
                            placeholder={trainerToUpdate.name}
                            {...register('name')}
                        />
                        <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                            type="number"
                            placeholder={trainerToUpdate.age.toString()}
                            {...register('age', { valueAsNumber: true })}
                        />
                        <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                            type="text"
                            placeholder={trainerToUpdate.cityOfBirth}
                            {...register('cityOfBirth')}
                        />
                    </div>
                    <div className='py-1 space-y-2'>
                        <h2 className='pb-1 text-gray-200'>Pokemons do treinador:</h2>
                        {trainerToUpdate.pokemons?.map((pokemon) => {
                            return (
                                <div key={pokemon.id} className='flex flex-row bg-slate-500 rounded-lg h-14'>
                                    <img className='h-10 ' src={pokemon.cover} />
                                    <div className='flex'>
                                        <h3 className='font-bold'>{pokemon.name}</h3>
                                        <span>Tipo: {pokemon.type} </span>
                                        <span>Habilidade: {pokemon.ability}</span>
                                        <Trash size={20} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className=' flex justify-between'>
                        <button type="submit" className=' mt-4 text-gray-100 bg-green-800 rounded-lg w-32 p-2'>
                            {/* disabled={isSubmitting} */}
                            Alterar dados
                        </button>

                        {/* <Dialog.Root>
                            <Dialog.Trigger className="mt-4 text-gray-100 bg-green-800 rounded-lg p-2">
                                Vincular Pokemons
                            </Dialog.Trigger>
                            <NewPokemon />
                        </Dialog.Root> */}
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )

}