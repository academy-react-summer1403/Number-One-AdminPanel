import { useMutation, useQuery } from "@tanstack/react-query";

// Get item with dependencies

export const useQueryWithDependencies = (
  key,
  action,
  dependencies,
  apiParams
) => {
  return useQuery({
    queryKey: [key, dependencies],
    queryFn: () => {
      return action(apiParams);
    },
    // enabled: !!(apiParams?.courseId && apiParams?.commentId),
  });
};

// Get item with out dependencies like normal query
export const useQueryWithoutDependencies = (key, action) => {
  return useQuery({
    queryKey: [key],
    queryFn: action,
  });
};

// Sending data along with refetching items when successful
export const useMutationWithRefetch = (key, action, refetch1, refetch2) => {
  return useMutation({
    mutationKey: [key],
    mutationFn: (id) => {
      return action(id);
    },
    onSuccess: () => {
      refetch1 && refetch1();
      refetch2 && refetch2();
    },
  });
};

// Sending data items when normal
export const useMutationWithoutRefetch = (key, action) => {
  return useMutation({
    mutationKey: [key],
    mutationFn: (id) => {
      return action(id);
    },
  });
};
