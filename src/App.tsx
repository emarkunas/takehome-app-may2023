// Global Styles
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// App Styles
import './App.scss';

import BenefitsDashboard from 'src/pages/BenefitsDashboard/BenefitsDashboard';

function App() {
  return (
    <div className="MyApp">
      <BenefitsDashboard />
    </div>
  );
}

export default App;
