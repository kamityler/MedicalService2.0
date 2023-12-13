import './ModalWindow.css';

const ModalWindow = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-close" onClick={handleClose}>×</div>       
      </section>
    </div>
  );
};

export default ModalWindow;