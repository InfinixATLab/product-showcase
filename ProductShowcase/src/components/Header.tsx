import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-center items-center bg-red-600 min-h-13 w-full">
      <Link to="/">
        <p className="text-white text-3xl">Pokedéx</p>
      </Link>
    </div>
  );
}
