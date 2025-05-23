import { useParams } from "react-router-dom";
import Dashboard from "./Dasboard"
import Product from "./Product";
import Users from "./User";
import Profile from "./ProfilePage"
const pageMap = {
  dashboard: Dashboard,
  product: Product,
  users: Users,
  profile: Profile,
};

const AdminPageRenderer = () => {
  const { page } = useParams();
  const Component = pageMap[page || "dashboard"];

  if (!Component) {
    return <div className="text-red-600 font-semibold">404 - Page Not Found</div>;
  }

  return <Component />;
};

export default AdminPageRenderer;
