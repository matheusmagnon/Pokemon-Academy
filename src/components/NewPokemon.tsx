import * as Dialog from '@radix-ui/react-dialog';
import { XCircle } from 'phosphor-react';

export function NewPokemon() {
    return (
        <Dialog.Portal className="align-middle">
            <Dialog.Overlay className="fixed inset-0 bg-black/40" />
            <Dialog.Content className="fixed  w-96 h-80 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 p-4 shadow">
                <div className='flex justify-between items-center pb-4'>
                    <Dialog.Title className="font-bold text-xl text-gray-100">Pesquise o Pokemon que deseja vincular</Dialog.Title>
                    <Dialog.Close>
                        <XCircle size={28} className='text-gray-100' />
                    </Dialog.Close>
                </div>
                <form className='flex flex-col'>
                    <div className=' flex flex-col space-y-2 '>
                        <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                            type="text"
                            placeholder="Pesquise o nome do pokemon"
                            required
                        // {...register('description')}
                        />

                    </div>

                    <div className=' flex justify-between'>
                        <button type="submit" className='mt-4 text-gray-100 bg-green-800 rounded-lg w-24 p-2'>
                            {/* disabled={isSubmitting} */}
                            Vincular
                        </button>


                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}