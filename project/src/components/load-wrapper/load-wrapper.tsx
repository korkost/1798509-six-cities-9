import LoadingScreen from '../loading-screen/loading-screen';

type LoadWrapperProps = {
  isLoaded: boolean,
  children: JSX.Element
};

function LoadWrapper({isLoaded, children}: LoadWrapperProps):JSX.Element {
  return (isLoaded && children) || <LoadingScreen />;
}

export default LoadWrapper;
