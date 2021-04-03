import {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import LoadingSpin from '../components/loading'
const API = {
    adres: "https://api.animegetter.workers.dev",
    version: "v1"
}

const Ep = (props) => {
    const [provider, setProvider] = useState(null) 
    const [data, setData] = useState(null)
    const [link, setLink] = useState(null)
    const [loading, isLoading] = useState(false)
    const [wybor, setWybor] = useState(null)
    const [tlumacz, setTlumacz] = useState(null)
    const playerRef = useRef(null)

    const fetchUpdate = async (params) => {
        const req = await fetch(`${API.adres}/${API.version}${params}`)
        const j = await req.json()
        setData(j)
        setLink(j.items[0].url)
    }

    useEffect(() => {
        setProvider(props.location.pathname.split('/')[2])
        fetchUpdate(props.location.pathname)
    }, [])

    const showPlayer = async (online_id) => {
        setLink(null)
        isLoading(true)
        const res = await fetch(`${API.adres}/${API.version}player/shinden/${online_id}`)
        const res_text = await res.text()
        setLink(res_text)
        isLoading(false)
    }

    return (
        <div class="w-full flex justify-center p-2">
            {data === null ? <div class="mt-72"><LoadingSpin/></div>  : 
                <div class="lg:w-2/4 sm:w-11/12 w-full mt-5">
                    {provider === 'shinden' ? <p class="font-semibold text-lg">{data.series_title}</p> : null }
                    <p class="font-semibold text-lg">{data.episode_title}</p>
                    <div
                        id="player"
                        ref={playerRef}
                        style={{
                            width:'100%',
                            paddingTop:'56.25%',
                            position:'relative',
                        }}
                        class="mt-5"
                    >
                        {!link ? 
                            <div
                                style={{
                                    width:'100%',
                                    height:'100%',
                                    position:'absolute',
                                    top:0,
                                    bottom:0,
                                    right:0,
                                    left:0,
                                }}
                            >
                                <div 
                                    class="container"
                                >

                                    <p style={{
                                        position:'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex:2,
                                        fontSize:'48px',
                                        textAlign:'center',
                                    }}>
                                    {loading ?
                                        <LoadingSpin/>
                                        :
                                        "Wybierz odtwarzacz"
                                    }</p>
                                </div>
                            </div>
                            :
                            <iframe 
                                src={link} 
                                allowfullscreen="true"
                                id="iframe_player"
                                style={{
                                    width:'100%',
                                    height:'100%',
                                    position:'absolute',
                                    top:0,
                                    bottom:0,
                                    right:0,
                                    left:0,
                                }}
                            />
                        }
                    </div>
                        {provider === 'shinden' ? 
                        <div>

                            {tlumacz ? <div>
                                <p>Grupa: {tlumacz.group}</p>
                                <p>Autor: {tlumacz.author.replace(/(<([^>]+)>)/gi, "").split("||").map(x => x.trim()).join(" || ")}</p>
                                <p>Źródło: <a href={tlumacz.source} >{tlumacz.source}</a></p>
                            </div> : null }
                            <div class="flex flex-row justify-between mt-2 mb-2">
                                <button>POPRZEDNI</button>
                                <button>NASTĘPNY</button>
                            </div>
                            <table
                                class="table-auto w-full"
                            >
                                <thead>
                                    <tr>
                                        <th>Player</th>
                                        <th>Grupa</th>
                                        <th>Rozdzielczość</th>
                                        <th class="hidden md:block">Data dodania</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.items.map((x) => {
                                        return (
                                            <tr 
                                                class="hover:bg-red-400 mt-2 mb-2 border-b-2 text-center"
                                                onClick={() => {
                                                    setTlumacz({
                                                        group:x.group,
                                                        source:x.source,
                                                        author:x.subs_author
                                                    })
                                                    setWybor(x.online_id)
                                                    showPlayer(x.online_id)
                                                    playerRef.current.scrollIntoView()
                                                }}
                                                style={{
                                                    backgroundColor: wybor === x.online_id ? 'red' : null
                                                }}
                                            >
                                                <td class="text-base ">{x.player}</td>
                                                <td class="text-base ">{x.group}</td>
                                                <td class="text-base ">{x.max_res}</td>
                                                <td class="text-base hidden md:block">{x.added}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </table>
                        </div>
                        
                        :

                        <div
                            style={{
                                display:'grid',
                                gridTemplateColumns:'repeat(auto-fill, minmax(120px, 1fr))',
                                gridGap:'1rem 1rem',
                                
                            }}
                            class="bg-white bg-opacity-5 rounded-b-lg overflow-hidden"
                        >
                            {data.items.map((x, idx) => {
                                return (
                                    <button 
                                    class={`w-full py-1 hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none outline-none text-center font-semibold text-lg`} 
                                    style={{
                                        backgroundColor: x.url === link ? '#B91C1C': null
                                    }}
                                    onClick={()=> setLink(x.url)}>{x.name.split(" do")[0]}</button>
                                )
                            })}
                        </div>
                        }
                    {provider !== 'shinden' ? 
                    <div class="mt-6">
                         <table
                            class="table-auto w-full"
                        >
                            <tr>
                                <td>Tytul odcinka</td>
                                <td>{data.episode_title}</td>
                            </tr>
                            <tr>
                                <td>Tytul serii</td>
                                <td>{data.series_title}</td>
                            </tr>
                            <tr>
                                <td>Tłumacz</td>
                                <td>{data.translator}</td>
                            </tr>

                        </table>
                    </div>
                    : null}
                </div>
            }
        </div>

    )
}

export default Ep