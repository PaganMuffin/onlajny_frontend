import {useEffect} from 'react'
import {Link} from 'react-router-dom'


const ListEpisode = (props) => {
    const provider = props.provider
    const seriesId = props.seriesId
    useEffect(() => {
        console.log(props)
    }, [props.data])
    return (
        <div>
            { !props.data ? null : 
                props.data.map((x, idx) => {
                    console.log(x)
                    const params = new URLSearchParams
                    params.append('provider', provider)
                    params.append('id', provider !== 'desu' ? seriesId : x.id)
                    params.append('episode', provider !== 'desu' ? x.id : x.ep)

                    return (
                        <div class="p-3"
                            style={{
                                backgroundColor: idx % 2 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <Link  to={`/episode?${params.toString()}${provider === 'shinden' ? `&endpoint=${x.endpoint}` :  ""}`}>
                                <div class="text-lg">
                                {x.title ?
                                <p>
                                    [{x.number}] {x.title}
                                </p>
                                :
                                <p>
                                    [{x.number}] Brak tytułu odcinka
                                </p>
                                }
                                </div>
                            </Link>
                        </div>
                    )
                })
            }

            

        </div>


    )
}

export default ListEpisode