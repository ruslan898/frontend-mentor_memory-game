import Menubar from './ui/menubar/Menubar';
import Gameboard from './ui/gameboard/Gameboard';
import Stats from './ui/stats/Stats';
import ResultCard from './ui/resultCard/ResultCard';
import StartCard from './ui/startCard/StartCard';
import './app.scss';

export default function App() {
  return (
    <main className="app">
      <div className="app-wrapper">
        <Menubar />
        <div className="game-wrapper">
          <Gameboard />
          <Stats />
        </div>
      </div>
      {/* <StartCard /> */}
      {/* <ResultCard /> */}
    </main>
  );
}
