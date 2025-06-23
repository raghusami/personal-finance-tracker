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
import  SavingPayments from '../pages/SavingPayment/AddEditSavingPayment'; //  New component for adding/editing saving payments
import ListSavingPayments from '../pages/SavingPayment/ListSavingPayments'; //  New component for listing saving payments
import AddEditInvestment from "../pages/Investment/AddEditInvestment";  
import ListInvestment from "../pages/Investment/ListInvestment"; //  New component for listing investments
import LandingPage from "../pages/Auth/LandingPage";
import UserProfile  from "../pages/Auth/ProfilePage"; //  Assuming you have a UserProfile type defined

const AppRoutes = () => ( 
 <Routes>
  {/* Public Routes */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected Routes inside Layout */}
    <Route path="/" element={<Layout />}>
    <Route path="dashboard" element={<Dashboard />} />

    {/* Profile Route (Fix applied here) */}
    <Route path="users/profile" element={<UserProfile />} />

    {/* Salary Routes */}
    <Route path="salary" element={<AddEditSalary />} />
    <Route path="salary/edit/:id" element={<AddEditSalary />} />
    <Route path="salary/list" element={<SalaryList />} />

    {/* Expense Routes */}
    <Route path="expenses" element={<AddEditExpense />} />
    <Route path="expenses/edit/:id" element={<AddEditExpense />} />
    <Route path="expenses/list" element={<ListExpenses />} />

    {/* Saving Routes */}
    <Route path="savings" element={<AddEditSaving />} />
    <Route path="savings/edit/:id" element={<AddEditSaving />} />
    <Route path="savings/list" element={<ListSaving />} />

    {/* Saving Payment Routes */}
    <Route path="saving-payments" element={<SavingPayments />} />
    <Route path="saving-payments/edit/:id" element={<SavingPayments />} />
    <Route path="saving-payments/list" element={<ListSavingPayments />} />

    {/* Investment Routes */}
    <Route path="investments" element={<AddEditInvestment />} />
    <Route path="investments/edit/:id" element={<AddEditInvestment />} />
    <Route path="investments/list" element={<ListInvestment />} />

    {/* Category Manager */}
    <Route path="categorymanager" element={<CategoryManager />} />
  </Route>
</Routes>

);

export default AppRoutes;
