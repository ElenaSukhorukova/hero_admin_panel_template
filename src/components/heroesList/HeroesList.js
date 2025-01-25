import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit'

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleting, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        state => state.filters.activeFilter,
        state => state.heroes.heroes,
        (filter, heroes) => filter === 'all' ? heroes : heroes.filter(hero => hero.element === filter)
    )
    const filteredHeroes = useSelector(filteredHeroesSelector);

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));

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
            .catch(() => dispatch(heroesFetchingError()));
        // eslint-disable-next-line
	}, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
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