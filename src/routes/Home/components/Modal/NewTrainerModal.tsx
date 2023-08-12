import * as Dialog from '@radix-ui/react-dialog';
import { XCircle } from 'phosphor-react';
import { Pokedex } from './Pokedex';
import { PokemonAcademyContext } from '../../../../context/PokemonAcademyContext'
import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
// import pokemonButton from '../../assets/'

export function NewTrainerModal() {
    const { createNameTrainer, createAgeTrainer, createCityOfBithTrainer, currentTrainer, createTrainer } = useContext(PokemonAcademyContext)
    const [isDisabled, setIsDisabled] = useState(true)
    const refNameTrainer = useRef() as MutableRefObject<HTMLInputElement>;
    const refAgeTrainer = useRef() as MutableRefObject<HTMLInputElement>;
    const refCityOfBirthTrainer = useRef() as MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        const fieldsIsEmpty = Object.values(currentTrainer).length < 4 ? true : false || Object.values(currentTrainer).includes("")

        setIsDisabled(fieldsIsEmpty);
    },
        [currentTrainer]
    )
    function onSubmitForm() {
        if (Object.values(currentTrainer).length < 4 ? true : false || Object.values(currentTrainer).includes("")) {
            alert('Preencha todos os campos')
        }
        else {
            createTrainer({
                ...currentTrainer,
                id: uuidv4()
            })
            refNameTrainer.current.value = ''
            refAgeTrainer.current.value = ''
            refCityOfBirthTrainer.current.value = ''
        }
    }
    function handleNameOfTrainer(e: React.ChangeEvent<HTMLInputElement>) {
        createNameTrainer(e.target.value)
    }
    function handleAgeOfTrainer(e: React.ChangeEvent<HTMLInputElement>) {
        createAgeTrainer(Number(e.target.value))
    }
    function handleCityOfBithTrainer(e: React.ChangeEvent<HTMLInputElement>) {
        createCityOfBithTrainer(e.target.value)
    }
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
                <form onSubmit={(onSubmitForm)} className='flex flex-col'>
                    <div className=' flex flex-col space-y-2 '>
                        <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                            ref={refNameTrainer}
                            type="text"
                            placeholder="Nome"
                            required
                            defaultValue={''}
                            onChange={(e) => { handleNameOfTrainer(e) }}
                        />
                        <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                            ref={refAgeTrainer}
                            type="number"
                            placeholder="Idade"
                            required
                            defaultValue={''}
                            onChange={(e) => { handleAgeOfTrainer(e) }}

                        // {...register('age', { valueAsNumber: true })}
                        />
                        <input className='text-gray-300 bg-gray-700 p-1 rounded-md'
                            ref={refCityOfBirthTrainer}
                            type="text"
                            placeholder="Cidade Natal"
                            required={true}
                            defaultValue={''}
                            onChange={(e) => { handleCityOfBithTrainer(e) }}
                        // {...register('cityOfBirth')}
                        />
                    </div>

                    <div className=' flex justify-between'>
                        <Dialog.Root>
                            <Dialog.Trigger className="mt-4 text-gray-100 bg-yellow-700 rounded-lg p-2">
                                Abrir Pokédex
                            </Dialog.Trigger>
                            <Pokedex />


                        </Dialog.Root>
                        <button type="button" onClick={() => onSubmitForm()} disabled={isDisabled} className='disabled:cursor-not-allowed disabled:opacity-60 mt-4 text-gray-100 bg-green-800 rounded-lg w-24 p-2'>
                            {/* disabled={isSubmitting} */}
                            Cadastrar
                        </button>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}