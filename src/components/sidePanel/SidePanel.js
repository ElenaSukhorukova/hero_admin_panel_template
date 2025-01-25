import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';

import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import { filtersFetching, filtersFetched, filtersFetchingError } from '../../actions';

import './sidePanel.scss';

const SidePanel = () => {
  const dispatch = useDispatch();
  const {request} = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()));

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