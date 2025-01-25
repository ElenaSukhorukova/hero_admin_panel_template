import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { dataFetching, heroesFetched, dataFetchingError, heroDeleting, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {filteredHeroes, dataLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(dataFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(dataFetchingError()));

        // eslint-disable-next-line
    }, []);

    // Задача для этого компонента:
    // При клике на "крестик" идет удаление персонажа из общего состояния
    // Усложненная задача:
    // Удаление идет и с json файла при помощи метода DELETE
	const onDelete = useCallback((heroId) => {
        dispatch(heroDeleting());
        request(`http://localhost:3001/heroes/${heroId}`, 'DELETE')
            .then(data => dispatch(heroDeleted(heroId)))
            .catch(() => dispatch(dataFetchingError()));
        // eslint-disable-next-line
	}, [request])

    if (dataLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (dataLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        let duration = 3;
        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} duration={duration += 1} onDelete={() => onDelete(id)}/>
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