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
                    gridTemplateColumns:'repeat(auto-fit, minmax(110px, 1fr))',
                    gridGap:'1rem 1rem',
                }}
            >
                {props.data.items.map((x, i) => {
                    
                    return(
                        <Link 
                            to={x.type === 'series' ? `/series?provider=${x.provider}&id=${x.id}-${x.ep}` : `/episode?provider=${x.provider}&id=${x.id}&episode=${x.ep}`}
                            title={x.title}
                            class="hover-trigger"
                        >
                            <div>
                                <div id="cover" class="overflow-hidden rounded-md">
                                    <div
                                        style={{
                                            backgroundImage:`url("https://bundle.animegetter.workers.dev/proxy?p=${x.cover}")`,
                                            width:'110px',
                                            height:'170px',
                                            
                                        }}
                                        class="bg-cover bg-no-repeat transition duration-250 ease-in hover-target transform"
                                    >
                                    </div>
                                </div>
                                <div id="title">
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