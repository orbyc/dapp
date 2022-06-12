import { Link } from "react-router-dom";
import { useMetaMask } from "metamask-react";

export function Navigation() {
  const { account, chainId } = useMetaMask();

  return (
    <ul>
      <li>
        <Link to={`/dashboard`}>Assets</Link>
      </li>
      <li>
        <Link to={`/dashboard/certificates`}>Certificates</Link>
      </li>
      <li>
        <Link to={`/dashboard/movements`}>Movements</Link>
      </li>
      <li>
        <button>Issue</button>
      </li>
      <li>
        Connected account {account} on chain ID {chainId}
      </li>
    </ul>
  );
}
