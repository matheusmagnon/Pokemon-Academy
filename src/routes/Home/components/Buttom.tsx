interface ButtomProps {
    children: React.ReactNode
}

export function Buttom(props: ButtomProps) {
    return (
        <button className=" flex bg-green-800 text-white p-2 rounded-lg hover:bg-green-900"> {props.children}</button>
    )
}