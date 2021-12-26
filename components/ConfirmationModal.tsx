interface ConfirmationModalProps {
  title: string;
  message: string;
}

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
