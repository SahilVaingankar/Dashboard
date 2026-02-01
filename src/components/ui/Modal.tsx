interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const modal = ({ onClose, children }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50  h-full w-full flex justify-center items-center"
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gray-700 p-6 rounded-md w-150 flex flex-col gap-4 m-5">
        <button
          onClick={onClose}
          className="absolute top-6.5 right-5 inline text-white hover:text-gray-300">
          X
        </button>
        {children}
      </div>
      {/* <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-700 p-6 rounded-md w-96 flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Title"
          className="border border-gray-300 p-2 rounded-md"
        />
        <input
          type="number"
          placeholder="Price"
          className="border border-gray-300 p-2 rounded-md"
        />
        <input
          type="number"
          placeholder="Stock"
          className="border border-gray-300 p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Category"
          className="border border-gray-300 p-2 rounded-md"
        />
      </form> */}
    </div>
  );
};

export default modal;
