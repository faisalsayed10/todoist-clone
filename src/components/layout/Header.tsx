import { FaPizzaSlice } from "react-icons/fa"

interface Props {
  
}

const Header: React.FC<Props> = () => {
  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li>+</li>
            <li><FaPizzaSlice /></li>
            <li>+</li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
