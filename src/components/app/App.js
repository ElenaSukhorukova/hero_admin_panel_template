import HeroesList from '../heroesList/HeroesList';
import SidePanel from '../sidePanel/SidePanel';

import './app.scss';

const App = () => {
    return (
        <main className="app">
            <div className="content">
                <HeroesList/>
                <SidePanel/>
            </div>
        </main>
    )
}

export default App;