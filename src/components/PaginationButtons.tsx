import { CaretLeft, CaretRight } from "phosphor-react"
import { useContext, useEffect } from "react";
import ReactPaginate from "react-paginate"
import { PokemonAcademyContext } from "../context/PokemonAcademyContext";


export function PaginationButtons() {

    const { setCurrentPage, setCPage, cPage, totalPages } = useContext(PokemonAcademyContext)

    interface PropsHandlePageClick {
        selected: number;
    }

    const handlePageClick = (selected: PropsHandlePageClick) => {
        setCPage(selected.selected + 1)
        console.log("current click page", selected.selected + 1);
    }
    useEffect(() => {
        setCurrentPage(cPage)
    }, [cPage, setCurrentPage])
    // console.log("current page", currentPage);

    return (
        <div className="text-gray-300 text-xs md:text-base">
            <ReactPaginate
                breakLabel={
                    <span className="mr-2">...</span>
                }
                nextLabel={
                    <span className=" flex items-center 
                    justify-center bg-slate-600 rounded-md ml-2">
                        <CaretRight size={22} />
                    </span>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={totalPages}
                previousLabel={
                    <span className="flex items-center 
                    justify-center bg-slate-600 rounded-md mr-1 ">
                        <CaretLeft size={22} />
                    </span>}
                containerClassName="flex items-center justify-center 
                mt-2 mb-1"
                pageClassName='block border-solid border-bg-slate-400
                hover:bg-slate-600 w-8 h-5 flex items-center 
                justify-center rounded-md'
                activeClassName="bg-slate-400 text-slate-700"
            // renderOnZeroPageCount={null}
            />

        </div>
    )
}