import {useEffect, useState} from 'react'
import Update from '../components/update'
import useDebounce from '../components/useDebounce'
import SearchView from '../components/search'
import Loading from '../components/loading'

const Main = (props) => {
    const [data, setData] = useState(null)
    const [searchData, setSearchData] = useState(null)

    const [search, setSearch] = useState(null)
    const debounceSearchTerm = useDebounce(search, 500)
    const [isSearching, setIsSearching] = useState(false)

    const fetchUpdate = async () => {
        const res = await fetch('https://bundle.animegetter.workers.dev/update')
        const res_json = await res.json()
        setData(res_json.reverse())
        setSearchData(null)
    }

    useEffect(() => {
        const params = new URLSearchParams(props.location.search)
        if(params.has('search')){
            setSearch(params.get('search'))
        } else {
            fetchUpdate()
        }
    }, [])

    useEffect(() => {
        if(search){
            apiCall(debounceSearchTerm)
        } else if(search == '') {
            console.log(setData)
            if(!data){
                fetchUpdate()
            }
            setIsSearching(false)
            props.history.push(``)
        }
    }, [debounceSearchTerm])

    const apiCall = async (e) => {
        setIsSearching(true)
        props.history.push(`?search=${e}`)
        const res_q = await fetch('https://bundle.animegetter.workers.dev/search?s='+e)
        const req_q_json = await res_q.json()
        setSearchData(req_q_json)
        //setData(null)
    }

    return (
        <div class="flex flex-col items-center ">
            <div class="text-center text-5xl font-extrabold mt-8 px-6">ONLAJNY.</div>
            <div class="text-center text-2xl font-thin px-6">Wszystko w jednym miejscu</div>
            <input
                value={search}
                placeholder="Tytuł anime..."
                class="dark:bg-white dark:bg-opacity-0 h-12 border-b-2 px-2 outline-none w-3/5 mt-8"
                onChange={(e) => setSearch(e.target.value)}
            ></input>
            {isSearching && searchData ? 
                <div class="w-4/5">
                    <div class="text-center text-3xl font-semibold mt-5 px-6">Wyszukiwanie</div>
                    <div 
                        style={{
                            display:'grid',
                            gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',
                            gridGap:'1rem 2rem',
                        }}
                    >
                        {searchData.map((x) => <SearchView data={x}></SearchView>)}
                    </div>
                </div>
                
            : data ?
                <>
                    <div class="text-center text-3xl font-semibold mt-5 px-6">Ostatnie aktualizacje</div>
                    <div class="flex flex-col w-4/5 ">
                        {data.map(x => <Update data={x}/>)}
                    </div>
                </>
            :
                <div class="mt-48" ><Loading/></div>
            }
        </div>
    );
}

export default Main;