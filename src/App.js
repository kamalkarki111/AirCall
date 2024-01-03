import logo from './logo.svg';
import './App.css';
import Header from './components/HeaderComponent'
import { CallLogs } from './components/CallLogsComponent';
import Footer from './components/FooterComponent';
import { useContext } from 'react';
import { CallTabContext } from './contexts/CallContextProvider';
import { ArchivedCallLogs } from './components/ArchiveedCallLogsComponent';
import Loader from './components/LoaderComponent';
import ErrorHandler from './components/ErrorHandlerToastComponent';


function App() {
  const tabContext = useContext(CallTabContext)
  return (
    <div className='container' style={{position:'relative'}} >
      <Header/>
      <div style={{height:'calc(100% - 162px)', position:'relative'}}>
        <div style={{height:'100%', overflow:'auto', position:'relative'}}>
          {tabContext.value.selectedtabs === 0 && <CallLogs/>}
          {tabContext.value.selectedtabs === 1 && <ArchivedCallLogs/>}
        </div>
        <Loader/>
      </div>
      <Footer/>
      <ErrorHandler/>
    </div>
  );
}

export default App;
