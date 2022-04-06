import { useParams } from 'react-router-dom';
import RoomProperty from '../../components/room/room-property';
import { useAppSelector } from '../../hooks';
import Error from '../error/error';

function Room() {
  const offers = useAppSelector(({DATA}) => DATA.offers);
  const paramsId = Number(useParams().id);
  const correctId = offers.some((offer)=>offer.id===paramsId);

  if (correctId) {
    return <RoomProperty /> ;
  }

  return <Error />;
}

export default Room;
