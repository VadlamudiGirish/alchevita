import { useRouter } from "next/router";
import useSWR from "swr";
import DetailPage from "@/components/DetailPage/DetailPage";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: remedy, isLoading, error } = useSWR(`/api/remedies/${id}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error while fetching index page:", error);
    return <div>Internal Server Error!</div>;
  }

  return <DetailPage element={remedy} />;
}
