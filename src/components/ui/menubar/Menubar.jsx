import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Button from '../button/Button';
import './menubar.scss';
import logo from '/src/assets/logo.svg';

export default function Menubar() {
  const { resetGame } = useContext(AppContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function updateWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  });

  const menubarBtns =
    windowWidth < 768 ? (
      <Button variant="primary">Menu</Button>
    ) : (
      <>
        <Button variant="primary" onClick={() => resetGame('restart')}>
          Restart
        </Button>
        <Button variant="secondary" onClick={() => resetGame('new-game')}>
          New Game
        </Button>
      </>
    );

  return (
    <header className="menubar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="menubar-btns">{menubarBtns}</div>
    </header>
  );
}
