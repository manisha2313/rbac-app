function ConfirmationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const onConfirm = () => {};
  return isOpen ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="confirmation-modal-title" className="text-lg font-bold">
          Confirm Action
        </h2>
        <p className="mt-2 text-gray-700">Are you sure you want to proceed?</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            type="button"
            className="rounded-lg bg-gray-500 px-4 py-2 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </section>
    </div>
  ) : null;
}

export default ConfirmationModal;
