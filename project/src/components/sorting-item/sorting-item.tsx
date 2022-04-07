import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSorting } from '../../store/offers-process/offers-process';
import { getSortingType } from '../../store/offers-process/selectors';

type SortingItemProps = {
  type: string;
  toggle: () => void;
}

function SortingItem({ type, toggle }:
  SortingItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const changeSortingType = (sortingType: string) => dispatch(changeSorting(sortingType));
  const sortingType = useAppSelector(getSortingType);

  return (
    <li
      key={type} onClick={() => { changeSortingType(type); toggle(); }}
      className={cn('places__option', { 'places__option--active': type === sortingType })}
      tabIndex={0}
      data-testid="SortingItem"
    >{type}
    </li>);
}

export default SortingItem;
