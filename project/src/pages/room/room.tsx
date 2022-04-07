import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadWrapper from '../../components/load-wrapper/load-wrapper';
import RoomProperty from '../../components/room/room-property/room-property';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import {
  fetchCommentAction,
  fetchOfferNearbyAction,
  fetchRoomAction
} from '../../store/api-actions';
import {
  getLoadedComments,
  getLoadedOffersNearby,
  getOffer,
  getOfferLoaded
} from '../../store/offers-data/selectors';

function Room() {
  const paramsId = Number(useParams().id);

  useEffect(() => {
    store.dispatch(fetchRoomAction(paramsId));
    store.dispatch(fetchCommentAction(paramsId));
    store.dispatch(fetchOfferNearbyAction(paramsId));
  }, [paramsId]);

  const isOfferLoaded = useAppSelector(getOfferLoaded);
  const isLoadedOffersNearby = useAppSelector(getLoadedOffersNearby);
  const isLoadedComments = useAppSelector(getLoadedComments);
  const currentOffer = useAppSelector(getOffer);

  return (
    <LoadWrapper isLoaded = {isOfferLoaded && isLoadedOffersNearby && isLoadedComments} >
      <RoomProperty currentOffer={currentOffer} />
    </LoadWrapper>
  );
}

export default Room;
