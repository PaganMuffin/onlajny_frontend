import { Link } from 'react-router-dom'


export const ButtonNext = (props) => {
    //console.log(props)
    const provider = props['provider']
    const text = props['text']
    const series_id = props['series_id']
    const data = props['data']
    let url;
    if(provider === 'ao')
        url = `/episode/${provider}/${data['series_id']}/${data['episode_id']}`
    else if(provider === 'shinden')
        url = `/episode/${provider}/${data['endpoint']}/${data['series_id']}/${data['episode_id']}`
    else if(provider === 'desu' || provider === 'frixysubs')
        url = `/episode/${provider}/${data['episode_id']}`
    return (
        <Link 
            class={`w-full py-1 hover:bg-indigo-800 transition duration-300 ease-in-out focus:outline-none outline-none text-center`}
            to={url}>
            <button 
                class="font-semibold text-lg focus:outline-none outline-none"
            >
                {text}
            </button>
        </Link>
    )
}