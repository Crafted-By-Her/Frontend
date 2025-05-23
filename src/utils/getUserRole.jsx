export const getUserRole = () => {
    return (
      localStorage.getItem("userRole") ||
      sessionStorage.getItem("userRole") ||
      ""
    ).toUpperCase();
  };
  