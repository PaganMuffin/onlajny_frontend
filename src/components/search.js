import {Link} from 'react-router-dom'

const SearchView = (props) => {

    const data = props.data

    return (
        <div class="flex flex-col">
            <div class="mt-10 font-semibold text-2xl p-1">{props.data.provider}</div>
            <div class="bg-white bg-opacity-5 rounded-lg w-full h-full">
                <div class="m-5">
                    {data.items.map((x) => {
                        
                        let url = `/series/${x.provider}`
                        if(x.endpoint){
                            url += `/${x.endpoint}`
                        }
                        url += `/${x.series_id}`
                        return (
                            <Link  to={url}>
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