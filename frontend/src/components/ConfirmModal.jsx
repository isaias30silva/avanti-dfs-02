export default function ConfirmModal({
  message,
  onConfirm,
  onCancel
}) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-lg shadow-lg w-96">

        <p className="text-lg mb-6">{message}</p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Confirmar
          </button>

        </div>
      </div>

    </div>
  );
}