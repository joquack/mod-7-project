import React, { useState } from 'react';
import { Modal } from '../context/Modal';
import NewServerForm from './NewServerForm'

function ServerFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create New Server</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewServerForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default ServerFormModal;
