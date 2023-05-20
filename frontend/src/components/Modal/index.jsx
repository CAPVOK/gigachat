

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 bg-white p-4">{children}</div>
      </div>
    );
  }
  
  export {Modal};