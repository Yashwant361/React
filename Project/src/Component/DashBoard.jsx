import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function DashBoard() {
  const navigate = useNavigate()

  return (
    <div className="container mt-4">
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}>← Go Back</button>
      <h2>Dashboard</h2>
      <div className="d-flex gap-3">
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </div>
      <hr />
      <Outlet />
    </div>
  )
}
