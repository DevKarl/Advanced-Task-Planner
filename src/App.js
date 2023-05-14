
import Container from "./components/Container";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { TasksContextProvider } from "./context/ContextProvider";
import BackgroundCover from "./components/BackgroundCover";

function App() {

  return (
      <TasksContextProvider>
        <ErrorBoundary>
          <BackgroundCover>
            <Container>
            </Container>
          </BackgroundCover>
        </ErrorBoundary>
      </TasksContextProvider>
  );
}

export default App;
