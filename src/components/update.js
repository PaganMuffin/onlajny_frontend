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
                    'box-shadow':' 10px 10px 20px 0px rgba(0,0,0,0.50)'
                }}
                class="bg-white bg-opacity-5 rounded-lg p-5 "
            >
                {props.data.items.map(x => {
                    return(
                        <Link to={x.type === 'series' ? `/series?provider=${x.provider}&id=${x.id}-${x.ep}` : `/episode?provider=${x.provider}&id=${x.id}&episode=${x.ep}`}>
                            <div 
                                class="bg-cover bg-no-repeat"
                                style={{
                                    backgroundImage:`url("https://bundle.animegetter.workers.dev/proxy?p=${x.cover}")`,
                                    minHeight:'140px',
                                    minWidth:'110px',
                                    borderRadius:'5px'
                                
                                }}
                            >
                            </div>
                            <div>
                                {x.title}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )

}


export default update;