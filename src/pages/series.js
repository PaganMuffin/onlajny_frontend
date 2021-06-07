import { useEffect, useState } from "react"
import ListEpisode from '../components/list'
import Loading from '../components/loading'
const API = {
    adres: "https://api.onlajny.ga",
    version: "v1"
}

const Series = (props) => {
    const [provider, setProvider] = useState(null) 
    const [seriesId, setSeriesId] = useState(null) 
    const [data, setData] = useState(null)
    const [episodes, setEpisodes] = useState(null)
    const fetchUpdate = async (props) => {
        const res = await fetch(`${API.adres}/${API.version}${props.pathname}`)
        const res_json = await res.json()
        document.title = " ONLAJNY | " + res_json['title']
        setData(res_json)
        setEpisodes(res_json.items)
    }

    useEffect(() => {
        let p = props.location.pathname.split('/')
        setProvider(p[2])
        fetchUpdate(props.location)
    }, [])

    const sortReverse = () => {
        setEpisodes([...episodes.reverse()])
    } 
    const showProvider = () => {
        return provider === 'ao' ? 'anime-odcinki.pl' : provider === 'shinden' ? 'shinden.pl' : 'desu-online.pl'
    }

    return (
        <div class="w-full flex justify-center">
            {data === null ? <div class="mt-72"><Loading/></div> : 
                
                <div class="md:w-3/4 flex md:flex-row md:items-start flex-col items-center">
                    <div class="md:w-1/4 w-2/4 mt-2">
                        <img class="rounded-lg mx-auto w-72 mt-5" src={`${API.adres}/${API.version}/proxy/${data.cover}`}></img>
                        {/* 
                            AO Tagi, rok wydania
                            Shinden Tagi, 
                            Desu Tagi, rok wydania
                            Tagi prowizoryczne: ["Komedia", "Okruchy Życia", "Romans", "Shounen", "Szkolne"]
                        */}
 
                    </div>
                    <div class="md:w-3/4  m-5">
                        <div>
                            <p class="font-extrabold text-2xl pb-5">{data.title}</p>
                            {/*<div class="border-b">{`Gatunki: ` + ["Komedia", "Okruchy Życia", "Romans", "Shounen", "Szkolne"].join(', ')}</div>*/}
                            <p class="mt-2">{data.desc}</p>
                            <p class="text-xs">Źródło: {showProvider()}</p>
                        </div>
                        <div class="mt-5 rounded-lg">
                            <button onClick={sortReverse}>DASDA</button>
                            <ListEpisode data={episodes} series_id={data.series_id} provider={provider} />
                        </div>

                    </div>
                </div>
            
            
            }
        </div>
    )

}

export default Series