import { Theme } from './settings/types';
import { TanjaMallAdminDashboardSystem } from './components/generated/TanjaMallAdminDashboardSystem';

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
      <TanjaMallAdminDashboardSystem />
    </>);
  // %EXPORT_STATEMENT%
}

export default App;