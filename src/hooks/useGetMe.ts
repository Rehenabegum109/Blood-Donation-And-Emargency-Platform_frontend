
"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/user/user.api";


export function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
