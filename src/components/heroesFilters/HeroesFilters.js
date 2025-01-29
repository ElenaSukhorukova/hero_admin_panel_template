import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import Spinner from '../spinner/Spinner';

import { filtersActiveFilterChanged, selectAll } from '../heroesFilters/filtersSlice';
import store from '../../store';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {activeFilter, filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const filterButtons = filters.map(({id, name, btnClass}, i) => {
        const className = classNames('btn', btnClass, {active: id === activeFilter});

        return <button
                    key={i}
                    className={className}
                    aria-pressed="true"
                    onClick={() => dispatch(filtersActiveFilterChanged(id))}
                >{name}</button>
    });

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filterButtons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;