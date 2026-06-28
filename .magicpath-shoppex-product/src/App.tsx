import { Theme } from './settings/types';
import { TanjaMallShoppexProductPage } from './components/generated/TanjaMallShoppexProductPage';

let theme: Theme = 'light';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return (
    <>
      <TanjaMallShoppexProductPage />
    </>);
  // %EXPORT_STATEMENT%
}

export default App;