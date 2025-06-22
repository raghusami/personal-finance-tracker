// src/pages/dashboard/PersonalFinanceDashboard.tsx

import {
  CurrencyRupeeIcon,
  ChartPieIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";

import PageHeader from "../components/PageHeader";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const incomeExpenseOptions = {
    chart: { id: "income-expense" },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
  };
  const incomeExpenseSeries = [
    { name: "Income", data: [40000, 50000, 60000, 48000, 62000, 58000] },
    { name: "Expense", data: [25000, 30000, 42000, 35000, 39000, 36000] },
  ];

  const expensePieOptions = {
    labels: ["Housing", "Groceries", "Transport", "Insurance"],
  };
  const expensePieSeries = [12000, 8000, 4000, 6000];

  const cashFlowOptions = {
    chart: { id: "cash-flow" },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
  };
  const cashFlowSeries = [
    { name: "Cash Flow", data: [10000, 18000, 12000, 24000, 15000] },
  ];

  const budgetHealthOptions = {
    chart: {
      type: "radialBar",
    },
    labels: ["Budget Health"],
  };
  const budgetHealthSeries = [70];

  return (
    <div className="flex flex-col gap-2 p-4">
      <PageHeader
        title="Dashboard"
        icon={<ChartPieIcon className="w-6 h-6" />}
        breadcrumb={["Dashboard"]}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[{
          title: "Total Income", value: "₹1,00,000", icon: <CurrencyRupeeIcon className="w-6 h-6" />
        }, {
          title: "Total Expenses", value: "₹52,000", icon: <BanknotesIcon className="w-6 h-6" />
        }, {
          title: "Total Savings", value: "₹20,000", icon: <RectangleStackIcon className="w-6 h-6" />
        }, {
          title: "Investments", value: "₹28,000", icon: <ArrowTrendingUpIcon className="w-6 h-6" />
        }, {
          title: "Surplus / Deficit", value: "₹0", icon: <ChartPieIcon className="w-6 h-6" />
        }].map((card, index) => (
          <div key={index} className="card bg-white border border-gray-200 shadow-xs">
            <div className="card-body">
              <div className="flex items-center gap-2">
                <div className="bg-primary text-white p-2 rounded-full">{card.icon}</div>
                <div>
                  <p className="font-semibold text-sm">{card.title}</p>
                  <p className="text-lg font-bold">{card.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="card bg-white border border-gray-200 shadow-xs">
          <div className="card-body">
            <p className="font-semibold text-sm mb-2">Income vs Expense</p>
            <Chart
              options={incomeExpenseOptions}
              series={incomeExpenseSeries}
              type="bar"
              height={250}
            />
          </div>
        </div>

        <div className="card bg-white border border-gray-200 shadow-xs">
          <div className="card-body">
            <p className="font-semibold text-sm mb-2">Category-wise Expense Breakdown</p>
            <Chart
              options={expensePieOptions}
              series={expensePieSeries}
              type="donut"
              height={250}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="card bg-white border border-gray-200 shadow-xs">
          <div className="card-body">
            <p className="font-semibold text-sm">Saving Progress - Vacation 2025</p>
            <progress className="progress progress-primary w-full" value={80} max={100}></progress>
            <p className="text-xs mt-1">₹80,000 / ₹1,10,000 (80%)</p>
          </div>
        </div>

        <div className="card bg-white border border-gray-200 shadow-xs">
          <div className="card-body">
            <p className="font-semibold text-sm mb-2">Investment Portfolio</p>
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Stocks</td><td>₹10,000</td><td>10%</td></tr>
                  <tr><td>MF</td><td>₹8,000</td><td>12%</td></tr>
                  <tr><td>Gold</td><td>₹10,000</td><td>8%</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="card bg-white border border-gray-200 shadow-xs">
          <div className="card-body">
            <p className="font-semibold text-sm mb-2">Cash Flow Trend</p>
            <Chart
              options={cashFlowOptions}
              series={cashFlowSeries}
              type="line"
              height={250}
            />
          </div>
        </div>

        <div className="card bg-white border border-gray-200 shadow-xs">
          <div className="card-body">
            <p className="font-semibold text-sm mb-2 text-center">Budget Health</p>
            <Chart
              options={budgetHealthOptions}
              series={budgetHealthSeries}
              type="radialBar"
              height={250}
            />
          </div>
        </div>
      </div>

      <div className="card bg-white border border-gray-200 shadow-xs mt-4">
        <div className="card-body">
          <p className="font-semibold text-sm mb-2">Top 5 Expenses This Month</p>
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>2025-06-01</td><td>Rent</td><td>₹15,000</td><td>Flat Rent</td></tr>
                <tr><td>2025-06-03</td><td>Groceries</td><td>₹5,000</td><td>Monthly Shopping</td></tr>
                <tr><td>2025-06-10</td><td>Insurance</td><td>₹3,000</td><td>Term Policy</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
