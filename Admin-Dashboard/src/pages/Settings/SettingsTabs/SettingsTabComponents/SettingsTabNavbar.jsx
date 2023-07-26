import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <ul className="flex flex-row gap-4 my-10 mx-8">
        <CustomLink to="/settings/profile">Account</CustomLink>
        <CustomLink to="/settings/apperance">Users</CustomLink>
        <CustomLink to="/settings/display">Display</CustomLink>
        <CustomLink to="/settings/notifications">Notifications</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}