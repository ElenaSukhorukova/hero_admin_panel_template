import {useHttp} from '../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { dataFetching, heroesFetched, dataFetchingError, heroDeleting, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {heroes, activeFilter, dataLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [filteredHeroes, setFilteredHeroes] = useState([]);

    useEffect(() => {
        dispatch(dataFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(dataFetchingError()));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setFilteredHeroes(heroes);

        if (activeFilter === 'all') return;

        setFilteredHeroes(heroes.filter(hero => hero.element === activeFilter));

        // eslint-disable-next-line
    }, [heroes, activeFilter])

    // Задача для этого компонента:
    // При клике на "крестик" идет удаление персонажа из общего состояния
    // Усложненная задача:
    // Удаление идет и с json файла при помощи метода DELETE
	const onDelete = (heroId) => {
        dispatch(heroDeleting());
        request(`http://localhost:3001/heroes/${heroId}`, 'DELETE')
            .then(data => dispatch(heroDeleted(heroId)))
            .catch(() => dispatch(dataFetchingError()));
	}

    if (dataLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (dataLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(props => {
            const id = props.id
            return <HeroesListItem key={id} {...props} onDelete={onDelete}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;