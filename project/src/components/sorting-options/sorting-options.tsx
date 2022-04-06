import { useState } from 'react';
import { SortingType } from '../../consts';
import { useAppSelector } from '../../hooks';
import SortingElement from '../sorting-element/sorting-element';

function SortingOptions(): JSX.Element {
  const sortingType = useAppSelector(({OFFERS}) => OFFERS.sortingType);
  const types = Object.values(SortingType);

  const [ visible, setVisible ] = useState(false);
  const toggle = () => setVisible(!visible);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        onClick={toggle}
        className="places__sorting-type" tabIndex={0}
      >
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${visible&&'places__options--opened'}`}>
        {types.map((type) =>
          <SortingElement key={type} type={type} toggle={toggle}/>)}
      </ul>
    </form>
  );}

export default SortingOptions;
