
import { Link } from "react-router";

export default function PublicHeader() {
  return (
    <header className="public-header">
      <Link to="/publico" className="public-brand" aria-label="AlzheCare, inicio">
        <span className="public-brand-mark" aria-hidden="true"></span>
        <span>AlzheCare</span>
      </Link>

      <Link to="/login" className="account-link">
        <span className="account-icon" aria-hidden="true">○</span>
        <span>Mi cuenta</span>
      </Link>
    </header>
  );
}