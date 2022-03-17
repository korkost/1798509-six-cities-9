import { SortingType } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { openSorting } from '../../store/action';
import SortingElement from '../sorting-element/sorting-element';

function SortingOptions(): JSX.Element {
  const isSorting = useAppSelector((state) => state.openSorting);
  const currentType = useAppSelector((state) => state.sortingType);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(openSorting());
  const types = Object.values(SortingType);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        onClick={toggle}
        className="places__sorting-type" tabIndex={0}
      >
        {currentType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSorting&&'places__options--opened'}`}>
        {types.map((type) =>
          <SortingElement key={type} type={type} toggle={toggle}/>)}
      </ul>
    </form>
  );}

export default SortingOptions;
