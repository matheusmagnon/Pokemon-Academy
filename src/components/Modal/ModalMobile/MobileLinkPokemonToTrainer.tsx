import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircle, MagnifyingGlass, XCircle } from 'phosphor-react';
import { useContext, useRef } from 'react';
import { PokemonAcademyContext } from '../../../context/PokemonAcademyContext';

import { PaginationButtons } from '../../PaginationButtons';

import { v4 as uuidv4 } from 'uuid'
import PokemonsViewMobile from './MobileScrollLinkPokemonToTrainer';

export function MobileLinkPokemonToTrainer() {
    const { fetchPokemonByName, fetchPokemonsByPage, currentPage
    } = useContext(PokemonAcademyContext)

    const refNamePokemon = useRef(null)


    interface handleSearchProps {
        current: { value: string }
    }
    const handleSearch = (namePokemon: handleSearchProps) => {
        const query = namePokemon?.current.value;
        fetchPokemonByName(query);
    }
    const handleResetFetch = () => {
        fetchPokemonsByPage(currentPage)
    }
    return (
        // <Dialog.Root>
        <Dialog.Portal className="">
            <Dialog.Overlay className="fixed inset-0 bg-black/40 " />
            <Dialog.Content className="md:fixed absolute w-72 top-80 md:h-fit md:top-1/2 md:m-1 -translate-y-1/2 
            left-1/2 -translate-x-1/2 rounded-md bg-gray-900 p-2 shadow">
                <div className='flex justify-between items-center pb-2'>
                    <Dialog.Title className="font-bold text-base text-gray-100 text-center pl-2">
                        Pesquise o Pokemon que deseja vincular
                    </Dialog.Title>
                    <Dialog.Close className='float-right -mt-8'>
                        <XCircle size={28} className=' text-gray-100' />
                    </Dialog.Close>
                </div>
                <form className='flex flex-col'>
                    <div className=' flex flex-row justify-between space-x-2 h-9'>
                        <input className='text-gray-300 text-xs bg-gray-700 p-1 w-full  rounded-md '
                            type="text"
                            placeholder="Pesquise o nome do pokemon"
                            ref={refNamePokemon}
                            required
                            defaultValue={''}
                        />
                        <button type="button" onClick={() => handleSearch(refNamePokemon)}
                            className="flex items-center border-2 border-green-900 p-2 rounded-lg 
                            space-x-1  hover:bg-green-800 hover:text-gray-100 text-gray-200 duration-150">
                            <MagnifyingGlass size={20} />
                            <span>
                                Buscar
                            </span>
                        </button>
                    </div>
                    <div className='flex flex-col justify-center pt-4'>
                        <h3 className="mb-2 text-base font-medium text-white">
                            Clique/role para escolher seu Pokemon:
                        </h3>
                        <PokemonsViewMobile />
                    </div>
                    <PaginationButtons />
                    <div className=' flex justify-center'>
                        <Dialog.Close type="button" onClick={() => handleResetFetch()} className='mt-4 text-gray-100 bg-green-800 rounded-lg w-24 p-2'>
                            Voltar
                        </Dialog.Close>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal >
        ///* </Dialog.Root> */ }
    )
}