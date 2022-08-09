import React, { useState } from 'react';
import { Modal } from '../context/Modal';
import UpdateServerForm from './UpdateServerForm'

function UpdateServerModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Server Settings</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateServerForm setShowModal={setShowModal} id={id}/>
        </Modal>
      )}
    </>
  );
}

export default UpdateServerModal;
