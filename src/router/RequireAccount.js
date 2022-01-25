import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const RequireAccount = ({ children }) => {
  const navigate = useNavigate();
  const account = useSelector((state) => state.blockchain.account);

  useEffect(() => {
    if (!account) {
      navigate("/", { replace: true });
    }
  }, [account]);

  return children;
};

export default RequireAccount;
