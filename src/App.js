
import Container from "./components/Container";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import BackgroundCover from "./components/BackgroundCover";

function App() {
  
  return (
        <ErrorBoundary>
          <BackgroundCover>
            <Container>
            </Container>
          </BackgroundCover>
        </ErrorBoundary>
  );
}

export default App;
