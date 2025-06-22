// components/Navbar.tsx
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <span className="text-xl font-bold">MoneyTrack</span>
      </div>
      <div className="flex-none gap-2">
        <button className="btn btn-ghost btn-circle">
          🔔
        </button>
        <button className="btn btn-ghost btn-circle">
          ⚙️
        </button>
        <button className="btn btn-ghost btn-circle">
          🚪
        </button>
      </div>
    </div>
  );
};

export default Navbar;
