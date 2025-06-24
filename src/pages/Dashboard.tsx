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
    chart: { id: "income-expense", foreColor: "inherit" },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
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
    chart: { id: "cash-flow", foreColor: "inherit" },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
  };
  const cashFlowSeries = [
    { name: "Cash Flow", data: [10000, 18000, 12000, 24000, 15000] },
  ];

  const budgetHealthOptions = {
    chart: { type: "radialBar", foreColor: "inherit" },
    labels: ["Budget Health"],
  };
  const budgetHealthSeries = [70];

  const summaryCards = [
    { title: "Total Income", value: "₹1,00,000", icon: <CurrencyRupeeIcon className="w-6 h-6" /> },
    { title: "Total Expenses", value: "₹52,000", icon: <BanknotesIcon className="w-6 h-6" /> },
    { title: "Total Savings", value: "₹20,000", icon: <RectangleStackIcon className="w-6 h-6" /> },
    { title: "Investments", value: "₹28,000", icon: <ArrowTrendingUpIcon className="w-6 h-6" /> },
    { title: "Surplus / Deficit", value: "₹0", icon: <ChartPieIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-base-100 text-base-content">
      <PageHeader
        title="Dashboard"
        icon={<ChartPieIcon className="w-6 h-6" />}
        breadcrumb={["Dashboard"]}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="rounded-xl border border-base-200 bg-base-100 p-4 shadow-xs hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-2 rounded-full">
                {card.icon}
              </div>
              <div>
                <p className="text-sm text-base-content/70">{card.title}</p>
                <p className="text-lg font-bold">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Goal & Budget Trackers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-base-100 border border-base-200 shadow-xs p-5">
          <h3 className="text-md font-semibold mb-3">🎯 Goal Tracker</h3>
          <p className="font-semibold text-sm mb-2">Emergency Fund</p>
          <progress className="progress progress-success w-full" value={12000} max={20000}></progress>
          <p className="text-xs text-base-content/70 mt-1">₹12,000 / ₹20,000 (60%)</p>
        </div>

        <div className="rounded-xl bg-base-100 border border-base-200 shadow-xs p-5">
          <h3 className="text-md font-semibold mb-3">📊 Budget Tracker</h3>
          <p className="font-semibold text-sm mb-2">Monthly Budget</p>
          <progress className="progress progress-warning w-full" value={42000} max={50000}></progress>
          <p className="text-xs text-base-content/70 mt-1">₹42,000 / ₹50,000 (84%)</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-base-100 border border-base-200 shadow-xs p-5">
          <h3 className="text-md font-semibold mb-3">Income vs Expense</h3>
          <Chart options={incomeExpenseOptions} series={incomeExpenseSeries} type="bar" height={250} />
        </div>

        <div className="rounded-xl bg-base-100 border border-base-200 shadow-xs p-5">
          <h3 className="text-md font-semibold mb-3">Category-wise Expense Breakdown</h3>
          <Chart options={expensePieOptions} series={expensePieSeries} type="donut" height={250} />
        </div>
      </div>

      {/* Savings & Portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-base-100 border border-base-200 shadow-xs p-5">
          <p className="font-semibold text-sm mb-2">Saving Progress - Vacation 2025</p>
          <progress className="progress progress-primary w-full" value={80} max={100}></progress>
          <p className="text-xs text-base-content/70 mt-1">₹80,000 / ₹1,10,000 (80%)</p>
        </div>

        <div className="rounded-xl bg-base-100 border border-base-200 shadow-xs p-5">
          <p className="font-semibold text-sm mb-2">Investment Portfolio</p>
          <div className="overflow-x-auto">
            <table className="table table-sm text-sm">
              <thead>
                <tr><th>Type</th><th>Amount</th><th>Growth</th></tr>
              </thead>
              <tbody>
                <tr><td>Stocks</td><td>₹10,000</td><td><span className="text-success font-medium">+10%</span></td></tr>
                <tr><td>MF</td><td>₹8,000</td><td><span className="text-success font-medium">+12%</span></td></tr>
                <tr><td>Gold</td><td>₹10,000</td><td><span className="text-success font-medium">+8%</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* More Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-base-100 border border-base-200 shadow-xs p-5">
          <h3 className="text-md font-semibold mb-3">Cash Flow Trend</h3>
          <Chart options={cashFlowOptions} series={cashFlowSeries} type="line" height={250} />
        </div>

        <div className="rounded-xl bg-base-100 border border-base-200 shadow-xs p-5">
          <h3 className="text-md font-semibold mb-3 text-center">Budget Health</h3>
          <Chart options={budgetHealthOptions} series={budgetHealthSeries} type="radialBar" height={250} />
        </div>
      </div>

      {/* Top 5 Expenses + Investments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-base-100 border border-base-200 shadow-xs p-5">
          <h3 className="text-md font-semibold mb-3">Top 5 Expenses This Month</h3>
          <div className="overflow-x-auto">
            <table className="table table-sm text-sm">
              <thead>
                <tr><th>Date</th><th>Category</th><th>Amount</th><th>Notes</th></tr>
              </thead>
              <tbody>
                <tr><td>2025-06-01</td><td>Rent</td><td><span className="badge badge-primary">₹15,000</span></td><td>Flat Rent</td></tr>
                <tr><td>2025-06-03</td><td>Groceries</td><td><span className="badge badge-primary">₹5,000</span></td><td>Monthly Shopping</td></tr>
                <tr><td>2025-06-10</td><td>Insurance</td><td><span className="badge badge-primary">₹3,000</span></td><td>Term Policy</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl bg-base-100 border border-base-200 shadow-xs p-5">
          <h3 className="text-md font-semibold mb-3">Top 5 Investments</h3>
          <div className="overflow-x-auto">
            <table className="table table-sm text-sm">
              <thead>
                <tr><th>Date</th><th>Type</th><th>Amount</th><th>Platform</th></tr>
              </thead>
              <tbody>
                <tr><td>2025-06-02</td><td>Stock</td><td><span className="badge badge-primary">₹10,000</span></td><td>Groww</td></tr>
                <tr><td>2025-06-06</td><td>Mutual Fund</td><td><span className="badge badge-primary">₹8,000</span></td><td>Zerodha</td></tr>
                <tr><td>2025-06-12</td><td>Gold</td><td><span className="badge badge-primary">₹6,000</span></td><td>PhonePe</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;