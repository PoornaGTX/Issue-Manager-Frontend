import { ButtonType } from '../../utils/types';
import PropagateLoader from 'react-spinners/PulseLoader';
import { override } from '../../utils/consts';

const Button = ({ hasFormChanged = () => true, isLoading, permission, title, submitHandler, pram, close }: ButtonType) => {
  return (
    <button
      className={`w-full rounded-lg p-2 text-white font-semibold ${
        (title === 'Edit' && !hasFormChanged()) || isLoading || close || permission ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'
      }`}
      onClick={(e) => submitHandler(e, pram)}
      disabled={(title === 'Edit' && !hasFormChanged()) || isLoading || permission}
    >
      {isLoading ? (
        <PropagateLoader color={'white'} loading={isLoading} cssOverride={override} size={6} aria-label="Loading Spinner" data-testid="loader" />
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
