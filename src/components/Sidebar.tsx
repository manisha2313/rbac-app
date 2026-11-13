import { Link } from "react-router";
import { LayoutDashboard, UserKey, Users, UserShield } from 'lucide-react';
function Sidebar() {
  const list = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Users", path: "/users", icon: <Users  /> },
    { name: "Roles", path: "/roles", icon: <UserKey   /> },
    { name: "Permission", path: "/permission", icon: <UserShield   /> },
  ];
  return (
    <div className="flex h-full flex-col justify-between ">
      <div>
        <ul>
          {list.map((items) => (
            <li key={items.name}>
              <Link to={items.path} className="text-l font-bold text-lg text-white flex items-center gap-2">
                {items.icon} {items.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
