import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Header() {
  return (
    <div className="w-full py-5 flex justify-center bg-gray-700 border-b border-gray-600">
      <Link to='/'>
        <Logo />
      </Link>
    </div>
  )
}
