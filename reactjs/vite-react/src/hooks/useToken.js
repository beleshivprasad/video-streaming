import useLocalstorage from "./useLocalstorage";

function useToken() {
  const { getItem } = useLocalstorage();
  const token = getItem("token");

  return token;
}

export default useToken;
