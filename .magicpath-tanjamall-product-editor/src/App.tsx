import { Theme } from './settings/types';
import { TanjaMallAdminProductEditor } from './components/generated/TanjaMallAdminProductEditor';

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
      <TanjaMallAdminProductEditor />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
