import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import {useHttp} from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';
import { heroesFetching, heroesFetchingError, heroAdded } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSaveNewHero = (hero) => {
        hero['id'] = uuidv4();

        dispatch(heroesFetching());
        request("http://localhost:3001/heroes", "POST", JSON.stringify(hero))
            .then(data => dispatch(heroAdded(hero)))
            .catch(() => dispatch(heroesFetchingError()));
    }

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const filterOptions = filters.filter(item => item.id !== "all")
                                 .map(({id, name}, i) => <option key={i} value={id}>{name}</option>);

    filterOptions.unshift(<option key={filterOptions.length}>Я владею элементом...</option>);

    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                element: ''
            }}
            validationSchema={
                Yup.object({
                    name: Yup.string().required('Required value!'),
                    description: Yup.string().required('Required value!'),
                    element: Yup.string()
                        .required('Required value!')
                        .oneOf(["fire", "water", "wind", "earth" ], 'Check element!'),
                })
            }
            onSubmit={(values, actions) => {
                onSaveNewHero(values)
                actions.setSubmitting(false)
                actions.resetForm({
                    values: {
                        name: '',
                        description: '',
                        element: ''
                    }
                })
            }}
            validateOnChange={false}
            validateOnBlur={false}
        >
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field
                        required
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Как меня зовут?"/>
                    <ErrorMessage className="error" name="name" component="div" />
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        required
                        name="description"
                        className="form-control"
                        id="description"
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}
                        as="textarea"
                    />
                    <ErrorMessage className="error" name="description" component="div" />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                        required
                        className="form-select"
                        id="element"
                        name="element"
                        as='select'
                    >
                        {filterOptions}
                    </Field>
                    <ErrorMessage className="error" name="element" component="div" />
                </div>
                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;