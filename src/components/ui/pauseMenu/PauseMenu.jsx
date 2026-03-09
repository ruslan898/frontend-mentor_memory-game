import Modal from '../modal/Modal';
import './pauseMenu.scss';

export default function PauseMenu() {
  return (
    <div className="overlay">
      <Modal variant='menu' />
    </div>
  )
}