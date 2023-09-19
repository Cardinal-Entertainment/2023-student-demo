import { Route, useRouter } from 'wouter';
import Home from './Home';
import Sort from './PhaserGame/Sortgame/Sort';
import Catch from './PhaserGame/Catchgame/Catch';
import Match from './PhaserGame/Matchgame/Match';
import RouterContext from './RouterContext';

const Routes = () => {
    const { push } = useRouter();

    return (
        <RouterContext.Provider value={push}>
        <>
            <Route exact path="/">
                <Home></Home>
            </Route>

            <Route path="/Sort">
                <Sort></Sort>
            </Route>

            <Route path="/Catch">
                <Catch></Catch>
            </Route>

            <Route path="/Match">
                <Match></Match>
            </Route>

        </>
        </RouterContext.Provider>
    )
}

export default Routes;