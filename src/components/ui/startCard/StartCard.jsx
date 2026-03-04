import Modal from '../modal/Modal';
import './startCard.scss';

import Logo from '/src/assets/logo.svg?react';

export default function StartCard() {
  return (
    <div className="start-card">
      <div className="start-card-wrapper">
        <Logo className="start-card-logo" />
        <Modal variant="start" />
      </div>
    </div>
  );
}
