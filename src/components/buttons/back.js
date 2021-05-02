import { Link } from 'react-router-dom'


export const ButtonBack = (props) => {
    const provider = props.provider
    const text = props.text
    const series_id = props.series_id
    let url = `/series/${provider}/${provider === 'shinden' ? props['series_endpoint'] + '/' : "" }${series_id}`
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