import { useContext, memo } from 'react';
import { AppContext } from '../../context/AppContext';
import Button from '../button/Button';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import './menubar.scss';
import logo from '/src/assets/logo.svg';

export default memo(function Menubar() {
  const { resetGame, setPaused } = useContext(AppContext);

  const windowWidth = useWindowWidth();

  const menubarBtns =
    windowWidth < 768 ? (
      <Button variant="primary" onClick={() => setPaused(true)}>
        Menu
      </Button>
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
});
