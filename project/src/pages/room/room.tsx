import { useParams } from 'react-router-dom';
import RoomProperty from '../../components/room/room-property';
import { useAppSelector } from '../../hooks';
import Error from '../error/error';


function Room(): JSX.Element {
  const paramsId = Number(useParams().id);
  const currentOffer = useAppSelector((state) => state.offer);

  if (paramsId!==currentOffer.id) {
    return <Error />;
  }

  return (<RoomProperty/>);
}

export default Room;
