import { ConfirmationModalProps } from "types";

const ConfirmationModal = ({ title, message }: ConfirmationModalProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{message}</p>

      <div>
        <button>NO, CANCEL</button>
        <button>YES, DELETE </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
