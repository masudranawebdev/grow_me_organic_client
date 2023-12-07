export const getUser = () => {
  const user = localStorage.getItem("users");
  if (!user) {
    return false;
  } else {
    return true;
  }
};
