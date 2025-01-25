import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';

import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import { dataFetching, filtersFetched, dataFetchingError } from '../../actions';

import './sidePanel.scss';

const SidePanel = () => {
  const dispatch = useDispatch();
  const {request} = useHttp();

  useEffect(() => {
    dispatch(dataFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(dataFetchingError()));

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