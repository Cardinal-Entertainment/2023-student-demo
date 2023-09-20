import { Route, useRouter } from 'wouter';
import Home from './Home';
import Sort from './PhaserGame/Sortgame/Sort';
import Catch from './PhaserGame/Catchgame/Catch';
import Match from './PhaserGame/Matchgame/Match';
import RouterContext from './RouterContext';

const Routes = () => {
    //const { push } = useRouter();

    return (

        <>
            <Route exact path="/">
                <Home></Home>
            </Route>

            <Route path="/sort">
                <Sort></Sort>
            </Route>

            <Route path="/catch">
                <Catch></Catch>
            </Route>

            <Route path="/match">
                <Match></Match>
            </Route>

        </>

    )
}

export default Routes;