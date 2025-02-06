import { useQuery } from "@tanstack/react-query";
import usersService from "../services/users";

const useUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: usersService.getAll,
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });

  return { data, isLoading, error };
};

export default useUsers;
