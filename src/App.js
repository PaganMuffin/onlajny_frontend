
import {useEffect, useState} from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
} from 'react-router-dom';

import Main from './pages/main'
import Series from './components/sites/series'
import Episode from './components/sites/episode'
const App = () => {

    const [dark, setDark] = useState(true)
    const [podstrona, setPodstrona] = useState("Strona Główna")
    
    useEffect(() => {
        if(dark === true){
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [dark])

    return (
        <Router>
            <div class="flex flex-col min-h-screen bg-white dark:bg-bg_dark dark:text-white" >
                {
                /*
                //AppBar NAZWA STRONY 
                //Logo
                //wyszukiwarka
                //desu update
                */
                }
                {/* APP BAR */}
                <div id="navbar" class="flex justify-between h-10">
                    <div class="flex divide-x-2 dark:divide-white pt-2 pb-2">
                        <div class="text-center font-extrabold text-2xl px-6"><Link to="/">ONLAJNY.</Link></div>
                        <div class="text-center font-light text-2xl px-6">{podstrona}</div>
                    </div>
                    {/*
                        <div class="flex pt-2 pb-2">
                            <button 
                                class="mr-2 transition duration-300 ease-in-out rounded-md focus:bg-white focus:bg-opacity-10 focus:outline-none outline-none text-center font-light text-2xl px-4"
                            >FAQ</button>
                            <button 
                                class="mr-2 transition duration-300 ease-in-out rounded-md focus:bg-white focus:bg-opacity-10 focus:outline-none outline-none text-center font-light text-2xl px-4"
                            >KONTAKT</button>
                            <button 
                                class="mr-2 transition duration-300 ease-in-out rounded-md focus:bg-white focus:bg-opacity-10 focus:outline-none outline-none text-center font-light text-2xl px-4"
                            >OSTRONIE</button>
                        </div>
                    
                    */}
                </div>
                {/* MAIN BOX DLA / */}
                <div class="mb-auto">
                    <Switch>
                        <Route exact path="/series" render={(props) => <Series {...props}/>}/> 
                        <Route exact path="/episode" render={(props) => <Episode {...props}/>}/> 
                        <Route exact path="/" render={(props) => <Main {...props}/>}/> 
                    </Switch>
                </div>
                <footer class="mt-10 h-10 text-center w-full">
                    DASDASD
                </footer>
            </div>
        </Router>
    );
}

export default App;