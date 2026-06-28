import { Theme } from './settings/types';
import { TanjaMallShoppexCategoryPage } from './components/generated/TanjaMallShoppexCategoryPage';

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
      <TanjaMallShoppexCategoryPage />
    </>);
  // %EXPORT_STATEMENT%
}

export default App;