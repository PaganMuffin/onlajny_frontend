import {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import LoadingSpin from '../components/loading'
import {ButtonPrev} from '../components/buttons/prev'
import {ButtonBack} from '../components/buttons/back'
import {ButtonNext} from '../components/buttons/next'
import {ButtonOff} from '../components/buttons/off'


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
    const [series_id, SetSeries_id] = useState(null)
    const playerRef = useRef(null)

    const fetchUpdate = async (params) => {
        const req = await fetch(`${API.adres}/${API.version}${params}`)
        const j = await req.json()
        document.title = "ONLAJNY | " + j["series_title"]
        setData(j)
        setLink(j.items[0].url)
    }

    useEffect(() => {
        setProvider(props.location.pathname.split('/')[2])
        SetSeries_id(props.location.pathname.split('/')[3])
    }, [])
    
    useEffect(() => {
        setData(null)
        setLink(null)
        fetchUpdate(props.location.pathname)
    }, [props.location.pathname])

    const showPlayer = async (online_id) => {
        setLink(null)
        isLoading(true)
        const res = await fetch(`${API.adres}/${API.version}/player/shinden/${online_id}`)
        const res_text = await res.text()
        setLink(res_text)
        isLoading(false)
    }

    const Player = () => {
        return (
            <div
            id="player"
            ref={playerRef}
            style={{
                width:'100%',
                paddingTop:'56.25%',
                position:'relative',
                
            }}
            class="mt-5 rounded-t-md"
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
                    sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation"
                    allowfullscreen="true"
                    id="iframe_player"
                    class="rounded-t-lg"
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
        )
    }

    const Player_list_desu_ao = () => {
        return (
        <div
            style={{
                display:'grid',
                gridTemplateColumns:'repeat(auto-fill, minmax(120px, 1fr))',
                //gridGap:'1rem 1rem',
                
            }}
            class="bg-white bg-opacity-8 rounded-b-lg overflow-hidden"
        >
            {data.items.map((x, idx) => {
                return (
                    <button 
                    class={`w-full py-1 hover:bg-indigo-800 transition duration-300 ease-in-out focus:outline-none outline-none text-center font-semibold text-lg`} 
                    style={{
                        backgroundColor: x.url === link ? '#4F46E5': null
                    }}
                    onClick={()=> setLink(x.url)}>{x.name.split(" do ")[0]}</button>
                )
            })}
        </div>)
    }

    const ShindenList = () => {
        return (
        <div>
            {tlumacz ? <div class="p-2">
                <p>Grupa: {tlumacz.group}</p>
                <p>Autor: {tlumacz.author.replace(/(<([^>]+)>)/gi, "").split("||").map(x => x.trim()).join(" || ")}</p>
                <p>Źródło: <a href={tlumacz.source} >{tlumacz.source}</a></p>
            </div> : null }
            <table
                class="table-auto w-full border-collapse mt-4"
            >
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Grupa</th>
                        <th>Rozdzielczość</th>
                        <th class="hidden md:block">Data dodania</th>
                    </tr>
                </thead>
                <tbody >
                    {data.items.map((x, idx) => {
                        return (
                            <tr 
                                class={`border-8 border-transparent hover:bg-opacity-20 text-center bg-white ${idx % 2 ? "bg-opacity-5" : "bg-opacity-10"}`}
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
                                    backgroundColor: wybor === x.online_id ? '#4F46E5' : null
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
        )
    }

    return (
        <div class="w-full flex justify-center p-2">
            {data === null ? <div class="mt-72"><LoadingSpin/></div>  : 
                <div class="lg:w-2/4 sm:w-11/12 w-full mt-5">
                    {provider === 'shinden' ? <p class="font-semibold text-lg">{data.series_title}</p> : null }
                    <p class="font-semibold text-lg">{data.episode_title}</p>
                        <Player/>
                        <div
                            class={`bg-white bg-opacity-8 overflow-hidden flex justify-between ${provider === 'shinden' ? 'rounded-b-lg': null }`}
                        >
                            {data['prev'] ? 
                                <ButtonPrev text="Poprzedni" provider={provider} data={data['prev']}></ButtonPrev>
                            :
                                <ButtonOff text="Poprzedni"/>
                            }
                            <ButtonBack text="Odcinki" series_id={data['series_id']} provider={provider} series_endpoint={data['series_endpoint']}></ButtonBack>

                            {data['next'] ? 
                                <ButtonNext text="Następny" provider={provider} data={data['next']} ></ButtonNext>
                            :
                                <ButtonOff text="Następny"/>
                            }
                        </div>
                        {provider === 'shinden' ? 
                        <ShindenList/>    
                        :
                        <Player_list_desu_ao/>
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