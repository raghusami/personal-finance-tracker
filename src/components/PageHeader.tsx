import { Link } from "react-router-dom";
import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  icon: ReactNode; // You can now pass any icon component dynamically
  breadcrumb: string[];
};

const PageHeader = ({ title, icon, breadcrumb }: PageHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Left: Icon + Title */}
      <div className="flex items-center gap-2">
        <span className="text-primary w-6 h-6">{icon}</span>
        <h1 className="flex items-center text-1xl font-bold gap-2">{title}</h1>
      </div>

      {/* Right: Breadcrumb */}
      <div className="text-sm breadcrumbs text-gray-500">
        <ul>
          <li><Link to="/">FinVista</Link></li>
          {breadcrumb.map((item, idx) => (
            <li key={idx}>
              {idx === breadcrumb.length - 1 ? (
                <span className="text-primary">{item}</span>
              ) : (
                <Link to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}>{item}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageHeader;
