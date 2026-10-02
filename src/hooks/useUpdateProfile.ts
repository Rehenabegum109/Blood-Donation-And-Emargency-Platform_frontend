
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile } from "../services/user/user.api";
import { IUpdateProfilePayload } from "../types/user.types";



export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateProfilePayload) =>
      updateMyProfile(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}
