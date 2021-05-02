import {useEffect} from 'react'
import {Link} from 'react-router-dom'


const ListEpisode = (props) => {
    const provider = props.provider
    return (
        <div>
            { !props.data ? null : 
                props.data.map((x, idx) => {
                    //  /episode/shinden/:endpoint/:series_id/:episode_id
                    //  /episode/ao/:series_id/:episode_id
                    //  /episode/desu/:id
                    let url = ''
                    url += '/episode'
                    url += `/${provider}`
                    
                    if(provider === 'shinden'){
                        url += `/${x.endpoint}/${props.series_id}/${x.episode_id}`
                    } else if (provider === 'ao'){
                        url += `/${x.series_id}/${x.episode_id}`
                    } else {
                        url += `/${x.episode_id}`
                    }
                    return (
                        <Link  to={url}>
                            <div class={`p-3 bg-white ${idx % 2 ? "bg-opacity-5" : "bg-opacity-10"}   hover:bg-opacity-20`}
                                style={{
                                    //backgroundColor: idx % 2 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                
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
                            </div>
                        </Link>
                    )
                })
            }

            

        </div>


    )
}

export default ListEpisode