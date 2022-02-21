import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyBudgets from './pages/MyBudgets';
import Expenses from './pages/Expenses';
import NotFound from './pages/NotFound';
import Scale from './pages/Scale';
import CreateBudget from './pages/CreateBudget';
import CreateExpense from './pages/CreateExpense';
import {SignIn, SignUp} from './pages/Connection';

function App() {


  return (
    <div className = "App">
      <BrowserRouter>
        
        <Header/>

        <div className = "main">
          <Routes>
            <Route path ="/" element = {<Home />}/>
            <Route path ="/signin" element = {<SignIn />}/>
            <Route path ="/signup" element = {<SignUp />}/>
            <Route path ="/profile" element = {<Profile />}/>
            <Route path ="/budgets" element = {<MyBudgets />}/>
            <Route path ="/createbudget" element = {<CreateBudget />}/>
            <Route path ="/budget:id/expenses" element = {<Expenses />}/>
            <Route path ="/createexpense" element = {<CreateExpense />}/>
            <Route path ="/scale" element = {<Scale />}/>

            <Route path ="*" element = {<NotFound />}/>

          </Routes>
        </div>
      </BrowserRouter>

    {/* A VOIR : pdt le cours on a installé globalement json-server : npm i json-server
    voir si necessaire de l'ajouter à notre projet (voir dépendances package.json)*/}
    </div>
  );
}

export default App;
