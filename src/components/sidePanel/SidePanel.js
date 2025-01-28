import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import { fetchFilters } from '../heroesFilters/filtersSlice';

import './sidePanel.scss';

const SidePanel = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);


    return (
        <div className="content__interactive">
            <HeroesAddForm/>
            <HeroesFilters/>
        </div>
    )
}

export default SidePanel;