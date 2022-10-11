import React, { useState } from 'react';
import { Modal } from '../context/Modal';
import NewChannelForm from './NewChannelForm';

function ChannelFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='create-server-button' onClick={() => setShowModal(true)}>+</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewChannelForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default ChannelFormModal;
