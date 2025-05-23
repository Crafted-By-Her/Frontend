import { useParams } from "react-router-dom";
import Product from "../SAdminDashbored/Product";
import Users from "../SAdminDashbored/User";
import Profile from "../SAdminDashbored/ProfilePage";
const pageMap = {
  product: Product,
  users: Users,
  profile: Profile,
};

const AdminPageRenderer = () => {
  const { page } = useParams();
  const Component = pageMap[page || "product"];

  if (!Component) {
    return <div className="text-red-600 font-semibold">404 - Page Not Found</div>;
  }

  return <Component />;
};

export default AdminPageRenderer;
