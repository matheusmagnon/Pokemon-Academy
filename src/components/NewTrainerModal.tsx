import * as Dialog from '@radix-ui/react-dialog';
import { XCircle } from 'phosphor-react';
import { NewPokemon } from './NewPokemon';

export function NewTrainerModal() {
    return (
        <Dialog.Portal className="align-middle">
            <Dialog.Overlay className="fixed inset-0 bg-black/40" />
            <Dialog.Content className="fixed  w-80 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 p-4 shadow">
                <div className='flex justify-between items-center pb-4'>
                    <Dialog.Title className="font-bold text-xl text-gray-100">Cadastro de treinador</Dialog.Title>
                    <Dialog.Close>
                        <XCircle size={28} className='text-gray-100' />
                    </Dialog.Close>
                </div>
                <form className='flex flex-col'>
                    <div className=' flex flex-col space-y-2 '>
                        <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                            type="text"
                            placeholder="Nome"
                            required
                        // {...register('description')}
                        />
                        <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                            type="number"
                            placeholder="Idade"
                            required
                        // {...register('price', { valueAsNumber: true })}
                        />
                        <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                            type="text"
                            placeholder="Cidade Natal"
                            required
                        // {...register('category')}
                        />
                    </div>

                    <div className=' flex justify-between'>
                        <button type="submit" className='mt-4 text-gray-100 bg-green-800 rounded-lg w-24 p-2'>
                            {/* disabled={isSubmitting} */}
                            Cadastrar
                        </button>

                        <Dialog.Root>
                            <Dialog.Trigger >
                                <button className='mt-4 text-gray-100 bg-green-800 rounded-lg p-2'>
                                    Vincular Pokemons
                                </button>
                            </Dialog.Trigger>
                            <NewPokemon />
                        </Dialog.Root>

                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}