interface ContainerProps {
    children: React.ReactNode
}
export function Container(props: ContainerProps) {
    return (
        <div className="bg-gray-900 p-3 md:px-52 h-screen flex flex-col  font-dmSans text-gray-200 ">
            {props.children}
        </div>
    )
}