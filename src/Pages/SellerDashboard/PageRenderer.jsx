import { useParams } from "react-router-dom";
import Account from "./Account";
import Product from "./Product";
import Review from "./Review";

const componentMap = {
  account: Account,
  product: Product,
  review: Review,
};

const DashboardPageRenderer = () => {
  const { page } = useParams();
  const Component = componentMap[page || "account"];

  if (!Component) {
    return <div className="text-red-600 font-semibold">404 - Page Not Found</div>;
  }

  return <Component />;
};

export default DashboardPageRenderer;
