import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
} from 'react-router-dom';

const update = (props) => {


    return (
        <div class="mt-5">
            <div class="mt-5 font-semibold text-2xl p-1">{props.data.provider}</div>
            <div
                style={{
                    display:'grid',
                    gridTemplateColumns:'repeat(auto-fill, 125px)',
                    justifyContent:'space-between',
                    gridGap:'25px 14px',
                }}
            >
                {props.data.items.map((x, i) => {
                    
                    let url = ''
                    url += x.type === 'series' ? `/series/${x.provider}` : `/episode/${x.provider}` 
                    if(x.provider === 'desu'){
                        url += x.series_id ? `/${x.series_id}` : `/${x.episode_id}`
                    } else {
                        url += `/${x.series_id}/${x.episode_id}`
                    }

                    return(
                        <Link 
                            to={url}
                            title={x.title}
                            class="hover-trigger"
                            style={{
                                width:'125px'
                            }}
                        >
                            <div style={{
                                display:'grid',
                                gridTemplateRows:'min-content auto',
                                width:'125px'
                            }}>
                                <div id="cover" class="overflow-hidden rounded-md">
                                    <div
                                        style={{
                                            backgroundImage:`url("https://api.animegetter.workers.dev/v1/proxy/${x.cover}")`,
                                            width:'125px',
                                            height:'180px'
                                        }}
                                        class="bg-cover bg-no-repeat transition duration-250 ease-in hover-target transform"
                                    />
                                </div>
                                <div id="title" class="truncate">
                                    {x.title}
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )

}


export default update;