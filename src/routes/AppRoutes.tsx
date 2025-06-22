import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import AddEditSalary from "../pages/Salary/AddSalary"; // ✅ Renamed from Salary
import AddEditExpense from "../pages/Expense/AddEditExpense";
import AddEditSaving from "../pages/Saving/AddEditSaving";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import SalaryList from "../pages/Salary/ListSalary";
import ListExpenses from "../pages/Expense/ListExpenses"; 
import ListSaving from "../pages/Saving/ListSaving"; // ✅ New component for listing savings
import CategoryManager from "../Others/CategoryManager";  // ✅ New component for managing categories

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="/" element={<Layout />}>
      <Route path="dashboard" element={<Dashboard />} />

      {/* ✅ Add/Edit Salary Routes */}
      <Route path="salary" element={<AddEditSalary />} />
      <Route path="salary/edit/:id" element={<AddEditSalary />} />
      <Route path="salary/list" element={<SalaryList />} />

      {/* ✅ Add/Edit Expenses Routes */}
      <Route path="expenses" element={<AddEditExpense />} />
      <Route path="expenses/edit/:id" element={<AddEditExpense />} />
      <Route path="expenses/list" element={<ListExpenses />} />

      <Route path="savings" element={<AddEditSaving />} />
      <Route path="savings/edit/:id" element={<AddEditSaving />} />
      <Route path="savings/list" element={<ListSaving />} />


      {/* Other routes */}
      <Route path="categorymanager" element={<CategoryManager />} />
      
    </Route>
  </Routes>
);

export default AppRoutes;
