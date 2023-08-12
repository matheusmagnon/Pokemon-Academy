import * as Dialog from '@radix-ui/react-dialog';
import { NewTrainerModal } from '../routes/Home/components/Modal/NewTrainerModal';
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom';

interface HeaderProps {
    action?: string
}
export function Header({ action }: HeaderProps) {
    return (
        <header className="h-fit flex flex-row justify-between items-center w-full">
            <img className="lg:h-16 h-10"
                src={logo}
                alt="Pokemon"
            ></img>
            <h1 className="lg:text-3xl text-xl">Pokemon Academy</h1>
            {action == undefined &&
                <Dialog.Root>
                    <Dialog.Trigger className="flex lg:text-base text-xs bg-green-800 text-white p-2 rounded-lg hover:bg-green-900" >
                        Novo treinador
                    </Dialog.Trigger>
                    <NewTrainerModal />
                </Dialog.Root>}
            {action == 'back' &&
                <button className="flex lg:text-base text-xs bg-green-800 text-white p-2 rounded-lg hover:bg-green-900" >
                    <NavLink to={'/'}>
                        Voltar
                    </NavLink>
                </button>
            }
        </header>
    )
}