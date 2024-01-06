import useSWR, { preload } from "swr"
import type { gradelevel } from "@prisma/client"
import { fetcher } from "@/libs/axios"

export const useGradeLevelData = () => {
  preload(`/gradelevel`, fetcher)

  const path = `/gradelevel`
  const { data, error, mutate } = useSWR<gradelevel[]>(path, fetcher, {
    refreshInterval: 10000,
  })

  return {
    tableData: data ?? [],
    isLoading: !error && !data,
    error,
    mutate,
  }
}
