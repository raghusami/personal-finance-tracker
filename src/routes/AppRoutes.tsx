import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import AddEditSalary from "../pages/Salary/AddSalary"; //  Renamed from Salary
import AddEditExpense from "../pages/Expense/AddEditExpense";
import AddEditSaving from "../pages/Saving/AddEditSaving";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import SalaryList from "../pages/Salary/ListSalary";
import ListExpenses from "../pages/Expense/ListExpenses"; 
import ListSaving from "../pages/Saving/ListSaving"; //  New component for listing savings
import CategoryManager from "../Others/CategoryManager";  //  New component for managing categories
import SavingPayments from '../pages/SavingPayment/AddEditSavingPayment'; //  New component for adding/editing saving payments
import ListSavingPayments from '../pages/SavingPayment/ListSavingPayments'; //  New component for listing saving payments
import AddEditInvestment from "../pages/Investment/AddEditInvestment";  
import ListInvestment from "../pages/Investment/ListInvestment"; //  New component for listing investments
import LandingPage from "../pages/Auth/LandingPage";
import  UserProfile from "../pages/Auth/ProfilePage"; //  New component for user profile

const AppRoutes = () => (
  <Routes>
     <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />


    <Route path="/" element={<Layout />}>
      <Route path="dashboard" element={<Dashboard />} />

      {/*  Add/Edit Salary Routes */}
      <Route path="salary" element={<AddEditSalary />} />
      <Route path="salary/edit/:id" element={<AddEditSalary />} />
      <Route path="salary/list" element={<SalaryList />} />

      {/*  Add/Edit Expenses Routes */}
      <Route path="expenses" element={<AddEditExpense />} />
      <Route path="expenses/edit/:id" element={<AddEditExpense />} />
      <Route path="expenses/list" element={<ListExpenses />} />

      <Route path="savings" element={<AddEditSaving />} />
      <Route path="savings/edit/:id" element={<AddEditSaving />} />
      <Route path="savings/list" element={<ListSaving />} />

      <Route path="saving-payments" element={<SavingPayments />} />
      <Route path="saving-payments/edit/:id" element={<SavingPayments />} />
      <Route path="saving-payments/list" element={<ListSavingPayments />} />


      <Route path="investments" element={<AddEditInvestment />} />
      <Route path="investments/edit/:id" element={<AddEditInvestment />} />
      <Route path="investments/list" element={<ListInvestment />} />


      {/* Other routes */}
      <Route path="categorymanager" element={<CategoryManager />} />
      <Route path="users/profile" element={<UserProfile />} />
      
    </Route>
  </Routes>
);

export default AppRoutes;
