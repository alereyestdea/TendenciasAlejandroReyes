import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
        border: 'none',
        maxWidth: '400px',
        width: '100%',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};

function ConfirmModal({ isOpen, onClose, onConfirm }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Confirmación"
            style={customStyles}
        >
            <h2 style={{ marginBottom: '20px' }}>¿Seguro que deseas eliminar este paciente?</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={onConfirm} style={{ backgroundColor: '#f44336', color: '#fff', borderRadius: '5px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Sí</button>
                <button onClick={onClose} style={{ backgroundColor: '#ccc', color: '#333', borderRadius: '5px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Cancelar</button>
            </div>
        </Modal>
    );
}

export default ConfirmModal;
