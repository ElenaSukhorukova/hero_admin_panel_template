import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import Spinner from '../spinner/Spinner';

import { activeFilterChanged } from '../../actions';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, activeFilter, dataLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();

    const onFilter = (filterName) => {
        dispatch(activeFilterChanged(filterName));
    }

    if (dataLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (dataLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const filterButtons = filters.map(({id, name, btnClass}, i) => {
        const className = classNames('btn', btnClass, {active: id === activeFilter});

        return <button
                    key={i}
                    className={className}
                    aria-pressed="true"
                    onClick={() => onFilter(id)}
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