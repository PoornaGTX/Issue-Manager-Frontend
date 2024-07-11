import { ButtonType } from '../../utils/types';
import PropagateLoader from 'react-spinners/PulseLoader';
import { override } from '../../utils/consts';

const CreateButton = ({ submitHandler, title, isLoading }: ButtonType) => {
  return (
    <button
      className="w-full bg-primary rounded-lg p-2 text-white font-semibold text-lg"
      onClick={(e) => submitHandler(e, 'createIssue')}
      disabled={isLoading}
    >
      {isLoading ? (
        <PropagateLoader color={'white'} loading={isLoading} cssOverride={override} size={6} aria-label="Loading Spinner" data-testid="loader" />
      ) : (
        title
      )}
    </button>
  );
};

export default CreateButton;
