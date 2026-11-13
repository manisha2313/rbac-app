import { UserRoundGroup } from "lucide-react";

function Cards() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-50">
        <div className="px-6 py-4 flex items-center gap-4">
      <span className="rounded bg-blue-100 p-2">
        <UserRoundGroup className="fill-blue-500 text-blue-500" />
      </span>
      <div >
        <span className="font-bold text-xl">12</span>
        <div className="text-gray-600 text-sm">Total Users</div>
      </div>
        </div>
    </div>
  );
}

export default Cards;
