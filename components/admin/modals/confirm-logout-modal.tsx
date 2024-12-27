import React from "react";

interface IConfirmModal {
  logoutHandler?: () => void;
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmLogoutModal: React.FC<IConfirmModal> = ({
  logoutHandler,
  setShowConfirmModal,
}) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-800 opacity-85"
        aria-hidden="true"
      ></div>

      <div
        className="fixed inset-0 z-10 w-screen overflow-y-auto"
        onClick={() => setShowConfirmModal!(false)}
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg"
          >
            <div className="bg-white px-6 md:px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex gap-2 md:gap-4 items-center">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <svg
                    className="size-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <p className="text-sm text-gray-700">
                    مطمئنید که میخواهید خارج شود؟
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 pb-5 flex gap-2 sm:px-6 items-center justify-center">
              <button
                onClick={logoutHandler}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-6 sm:px-10 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                بله
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmModal!(false)}
                className="inline-flex w-full justify-center rounded-md bg-white px-6 sm:px-10 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                خیر
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
