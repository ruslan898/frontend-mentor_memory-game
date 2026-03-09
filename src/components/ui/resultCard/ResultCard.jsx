import Modal from '../modal/Modal';
import './resultCard.scss';

export default function ResultCard({variant = 'result-solo'}) {
  return (
    <div className="overlay">
      <Modal variant={ variant } />
    </div>
  );
}
