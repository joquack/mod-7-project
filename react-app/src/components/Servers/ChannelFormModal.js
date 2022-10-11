import React, { useState } from 'react';
import { Modal } from '../context/Modal';
import NewServerForm from './NewServerForm'

function ChannelFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='create-server-button' onClick={() => setShowModal(true)}>+</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewServerForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default ChannelFormModal;
