import BookListProvider from './context/BookListContext';
import Routes from './routes/Routes';

const App = () => {
  return (
    <BookListProvider>
      <div className="container">
        <main>
          <Routes />
        </main>
      </div>
    </BookListProvider>
  );
};

export default App;
