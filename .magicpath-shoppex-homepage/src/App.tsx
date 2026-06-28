import { Theme } from './settings/types';
import { TanjaMallShoppexHomepage } from './components/generated/TanjaMallShoppexHomepage';

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
      <TanjaMallShoppexHomepage />
    </>);
  // %EXPORT_STATEMENT%
}

export default App;