import PropTypes from 'prop-types';

export default function Modal({ open, title, children, onClose, onConfirm, confirmText = 'Confirmar' }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3>{title}</h3>
        <div>{children}</div>
        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>Cancelar</button>
          {onConfirm && <button className="btn danger" onClick={onConfirm}>{confirmText}</button>}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string
};
