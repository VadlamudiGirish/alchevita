import RemedyForm from "@/components/RemedyForm/RemadyForm";
import TitleBar from "@/components/TitleBar/TitleBar";
import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";
import styled from "styled-components";

const AccessDenied = styled.h2`
  text-align: center;
  color: #ff4444;
  margin-top: 2rem;
`;

export default function CreateRemedy() {
  const router = useRouter();
  // const { status } = useSession();

  // if (status !== "authenticated") {
  //   return <AccessDenied>Please log in to create remedies</AccessDenied>;
  // }

  async function handleCreate(payload) {
    const res = await fetch("/api/remedies/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/");
    }
  }
  return (
    <>
      <TitleBar title={"Create New Remedy"}></TitleBar>
      <RemedyForm onSubmit={handleCreate} mode="create" />
    </>
  );
}
