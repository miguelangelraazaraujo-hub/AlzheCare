
import { Link } from "react-router";

export default function PublicHeader() {
  return (
    <header className="public-header">
      <Link to="/publico" className="public-brand" aria-label="AlzheCare, inicio">
        <div className="public-brand-mark" aria-hidden="true">
          <img src="src/assets/AlzheCare.png" alt="logo Alzhecare" height={30} width={30}/>
        </div>
        <span>AlzheCare</span>
      </Link>

      <Link to="/login" className="account-link">
        <span className="account-icon" aria-hidden="true">○</span>
        <span>Mi cuenta</span>
      </Link>
    </header>
  );
}