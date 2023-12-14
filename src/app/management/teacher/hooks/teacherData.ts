import useSWR from "swr"
import type { teacher } from "@prisma/client"
import { fetcher } from "@/libs/axios"

export const useTeacherData = () => {
  const path = `/teacher`
  const { data, error, mutate } = useSWR<teacher[]>(path, fetcher, {
    refreshInterval: 10000,
  })

  return {
    tableData: data ?? [],
    isLoading: !error && !data,
    error,
    mutate,
  }
}
