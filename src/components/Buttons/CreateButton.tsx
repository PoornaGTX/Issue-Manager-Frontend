import { ButtonType } from '../../utils/types';

const CreateButton = ({ submitHandler, title, isLoading }: ButtonType) => {
  return (
    <button
      className="w-full bg-primary rounded-lg p-2 text-white font-semibold text-lg"
      onClick={(e) => submitHandler(e, 'createIssue')}
      disabled={isLoading}
    >
      {title}
    </button>
  );
};

export default CreateButton;
