import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSorting } from '../../store/action';

type SortingElementProps = {
  type: string;
  toggle: () => void;
}

function SortingElement({type, toggle}: SortingElementProps): JSX.Element {

  const dispatch = useAppDispatch();
  const changeSortingType = (sortingType: string) => dispatch(changeSorting(sortingType));
  const currentType = useAppSelector((state) => state.sortingType);

  return (
    <li
      key={type} onClick={()=>{changeSortingType(type); toggle();}}
      className={`places__option ${currentType===type&&'places__option--active'}`}
      tabIndex={0}
    >{type}
    </li>);
}

export default SortingElement;
