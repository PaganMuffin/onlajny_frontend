import {Link} from 'react-router-dom'

const SearchView = (props) => {

    const data = props.data

    return (
        <div class="flex flex-col">
            <div class="mt-10 font-semibold text-2xl p-1">{props.data.provider}</div>
            <div class="bg-white bg-opacity-5 rounded-lg w-full h-full">
                <div class="m-5">
                    {data.items.map((x) => {
                        return (
                            <Link  to={`/series?provider=${x.provider}&id=${x.id}${x.provider === 'shinden' ? `&endpoint=${x.endpoint}` :  ""}`}>
                                <p class="truncate p-1 ">{x.title}</p>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default  SearchView;