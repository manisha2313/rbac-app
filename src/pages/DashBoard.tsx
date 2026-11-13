import Cards from "../components/dashboard/Cards";
import DashBoardRecentUsers from "../components/dashboard/RecentUsers";
function DashBoard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Cards />
      <DashBoardRecentUsers />
    </div>
  );
}

export default DashBoard;
