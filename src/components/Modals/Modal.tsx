import { ModalTypes } from '../../utils/types';
import IssueModal from './IssueModal';

const Modal = ({ open, closeHandler, children, modalData }: ModalTypes) => {
  if (!open) {
    return null;
  }
  return (
    <div className="fixed z-20 inset-0  bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center text-slate-950 overflow-y-hidden">
      <div className="w-[400px] sm:w-[600px] flex flex-col shadow-xl">
        <button className="text-white text-xl place-self-end" onClick={() => closeHandler()}>
          X
        </button>
        <div className="bg-white p-4 rounded-lg overflow-y-auto max-h-screen">
          <IssueModal modalDetails={modalData} closeHandler={closeHandler} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
