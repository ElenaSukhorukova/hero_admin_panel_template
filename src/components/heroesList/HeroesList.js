import {useHttp} from '../../hooks/http.hook';
// import { useEffect, useCallback, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

// import {fetchHeroes, hereDeleted, filteredHeroesSelector } from './heroesSlice';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {
        data: heroes = [],
        // isFetching,
        isLoading,
        // isSuccess,
        isError,
        // error
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    // const filteredHeroes = useSelector(filteredHeroesSelector);

    const activeFilter = useSelector(state => state.filters.activeFilter)

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter);
        }
        // eslint-disable-next-line
    }, [heroes, activeFilter])

    // const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    // const dispatch = useDispatch();
    const {request} = useHttp();

    // useEffect(() => {
    //     dispatch(fetchHeroes());
    //     // eslint-disable-next-line
    // }, []);

    // Задача для этого компонента:
    // При клике на "крестик" идет удаление персонажа из общего состояния
    // Усложненная задача:
    // Удаление идет и с json файла при помощи метода DELETE
    const onDelete = useCallback((id) => {
        deleteHero(id);
        // request(`http://localhost:3001/heroes/${id}`, "DELETE")
        //     .then(data => console.log(data, 'Deleted'))
        //     // .then(dispatch(hereDeleted(id)))
        //     .catch(err => console.log(err));
        // eslint-disable-next-line
    }, [request]);

    // if (heroesLoadingStatus === "loading") {
    //     return <Spinner/>;
    // } else if (heroesLoadingStatus === "error") {
    //     return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    // }

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
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