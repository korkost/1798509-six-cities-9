import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSorting } from '../../store/offers-process/offers-process';

type SortingElementProps = {
  type: string;
  toggle: () => void;
}

function SortingElement({ type, toggle }:
  SortingElementProps): JSX.Element {
  const dispatch = useAppDispatch();
  const changeSortingType = (sortingType: string) => dispatch(changeSorting(sortingType));
  const {sortingType} = useAppSelector(({ OFFERS }) => OFFERS);

  return (
    <li
      key={type} onClick={() => { changeSortingType(type); toggle(); }}
      className={cn('places__option', { 'places__option--active': type === sortingType })}
      tabIndex={0}
    >{type}
    </li>);
}

export default SortingElement;
