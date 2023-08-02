/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Dialog from '@radix-ui/react-dialog';
import { Trash, XCircle } from 'phosphor-react';
import { NewPokemon } from './LinkPokemonToTrainerModal';
import { PokemonAcademyContext, TrainerType } from '../../context/PokemonAcademyContext'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { useContext } from 'react';
import { PokemonCard } from '../PokemonsCard';


// const newTrainerFormSchema = {
//     name: yup.string(),
//     age: yup.number(),
//     citeOfBirth: yup.string(),
// }
interface UpdateTrainerProps {
    trainerToUpdate: TrainerType
}


export function UpdateTrainerModal({ trainerToUpdate }: UpdateTrainerProps) {

    const { updateTrainer } = useContext(PokemonAcademyContext)

    const { register, handleSubmit, reset } = useForm<TrainerType>()

    function handleUpdateTrainer(data: TrainerType) {
        console.log(trainerToUpdate);
        console.log(data);


        reset()
        updateTrainer(trainerToUpdate, data)
    }
    return (
        <Dialog.Portal className="align-middle">
            <Dialog.Overlay className="fixed inset-0 bg-white/40" />
            <Dialog.Content className="fixed  w-1/2 h-fit top-96 -translate-y-96 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 p-4 shadow">
                <div className='flex justify-between items-center pb-1'>
                    <Dialog.Title className="font-bold text-xl text-gray-100">
                        Edite as informações do treinador
                    </Dialog.Title>
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
                    <div className='flex flex-wrap justify-center '>
                        <h3 className="m-1 text-lg font-medium text-white">Pokemons do treinador:</h3>
                        <ul className="grid w-full gap-2 md:grid-cols-3 ">
                            {trainerToUpdate.pokemons?.map((pokemon) => {
                                return (
                                    <PokemonCard ability={pokemon.ability}
                                        cover={pokemon.cover}
                                        name={pokemon.name}
                                        types={pokemon.types} />
                                )
                            })}
                        </ul>
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