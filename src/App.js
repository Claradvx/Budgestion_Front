import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyBudgets from './pages/MyBudgets';
import Expenses from './pages/Expenses';
import NotFound from './pages/NotFound';
import Scale from './pages/Scale';
import SaveBudget from './pages/SaveBudget';
import SaveExpense from './pages/SaveExpense';
import {SignIn, SignUp} from './pages/Connection';
import Expense from './pages/Expense';
import UpdateBudget from './pages/UpdateBudget';
import SaveParticipants from './pages/SaveParticipants';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        
        <Header/>

        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/budgets" element={<MyBudgets />} />
            <Route path="/savebudget" element={<SaveBudget />} />
            <Route path="/savebudget:name_budget/Participants" element={<SaveParticipants/>} />
            <Route path="/updatebudget:id_budget" element={<UpdateBudget />} />
            <Route path="/budget:id_budget/expenses" element={<Expenses />} />
            <Route path="/budget:id_budget/expense:id_expense" element={<Expense />} />
            <Route path="/budget:id_budget/saveexpense" element={<SaveExpense />} />
            <Route path="//budget:id_budget/balance" element={<Scale />}/>

            <Route path="*" element={<NotFound />}/>

          </Routes>
        </div>
      </BrowserRouter>

    {/* A VOIR : pdt le cours on a installé globalement json-server : npm i json-server
    voir si necessaire de l'ajouter à notre projet (voir dépendances package.json)*/}
    </div>
  );
}

export default App;
