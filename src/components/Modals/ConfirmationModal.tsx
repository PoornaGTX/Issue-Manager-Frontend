import warning_icon from '../../assets/icons/warning_icon.png';
import { confirmationModal } from '../../utils/types';

const ResponseModal = ({ open, alertText, closeHandler, issueDeleteHandler }: confirmationModal) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center text-slate-950 z-10">
      <div className="w-[350px] flex flex-col">
        <div className="bg-white p-2 rounded-lg flex flex-col justify-center items-center">
          <img src={warning_icon} alt={'icon'} className="w-20 h-20 mb-2" />
          <h2 className="text-lg font-semibold capitalize mb-1">Do you want to delete this issue?</h2>
          <h2 className="text-xl text-center font-semibold capitalize">{alertText}</h2>

          <div className="flex justify-between w-full gap-x-4">
            <button className="bg-primary rounded-lg  text-white font-semibold mt-2 px-3 py-2 w-1/2" onClick={issueDeleteHandler}>
              Yes
            </button>

            <button className="bg-white rounded-lg  text-black border-slate-600 border-2 font-semibold mt-2 px-3 py-2 w-1/2" onClick={closeHandler}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;
