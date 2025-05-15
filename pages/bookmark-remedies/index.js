import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import CardList from "@/components/CardList/CardList";
import TitleBar from "@/components/TitleBar/TitleBar";
import RemedyFilter from "@/components/RemedyFilter/RemedyFilter";
import { useBookmarks } from "@/hooks/useBookmarks";
// import { useSession } from "next-auth/react";

const EmptyMessage = styled.p`
  margin: 2rem 0;
  text-align: center;
  color: #666;
`;

const AccessDenied = styled.h2`
  text-align: center;
  color: #ff4444;
  margin-top: 2rem;
`;

export default function Home({ initialSymptom }) {
  const router = useRouter();
  // const { status } = useSession();
  const [selectedSymptom, setSelectedSymptom] = useState(initialSymptom || "");
  const currentPath = router.pathname;

  // Get bookmark functionality
  const { toggle } = useBookmarks();

  // Get remedies with combined filters
  const {
    data: remedies = [],
    isLoading,
    error,
    mutate,
  } = useSWR(
    // status === "authenticated"
    //   ? selectedSymptom
    //     ? `/api/remedies?bookmarked=true&symptom=${encodeURIComponent(
    //         selectedSymptom
    //       )}`
    //     : `/api/remedies?bookmarked=true`
    //   : null,
    selectedSymptom
      ? `/api/remedies?bookmarked=true&symptom=${encodeURIComponent(
          selectedSymptom
        )}`
      : `/api/remedies?bookmarked=true`,
    {
      fallbackData: [],
    }
  );

  useEffect(() => {
    setSelectedSymptom(router.query.symptom || "");
  }, [router.query.symptom]);

  // if (status !== "authenticated") {
  //   return (
  //     <AccessDenied>
  //       Please log in to view your bookmarked remedies
  //     </AccessDenied>
  //   );
  // }

  // Symptom filter handlers
  const handleSelect = (symptomName) => {
    setSelectedSymptom(symptomName);
    router.push(
      {
        pathname: "/bookmark-remedies",
        query: symptomName ? { symptom: symptomName } : {},
      },
      undefined,
      { shallow: true }
    );
  };

  const handleClear = () => {
    setSelectedSymptom("");
    router.push({ pathname: "/bookmark-remedies", query: {} }, undefined, {
      shallow: true,
    });
  };

  // Bookmark toggle handler
  const handleBookmarkToggle = async (remedyId, isBookmarked) => {
    // Optimistic update
    const optimisticData = remedies.map((remedy) =>
      remedy._id === remedyId
        ? { ...remedy, isBookmarked: !isBookmarked }
        : remedy
    );

    mutate(optimisticData, false);

    try {
      await toggle(remedyId, isBookmarked, currentPath);
      mutate();
    } catch (error) {
      mutate(); // Rollback on error
    }
  };

  if (isLoading) return <TitleBar title="Loading..." />;
  if (error) {
    console.error(error);
    return <TitleBar title="Error fetching data" />;
  }

  return (
    <>
      <TitleBar title={"My Remedies"} />

      {currentPath === "/bookmark-remedies" && (
        <RemedyFilter
          selectedSymptom={selectedSymptom}
          onSelect={handleSelect}
          onClear={handleClear}
        />
      )}

      {remedies.length === 0 ? (
        <EmptyMessage>No remedies found</EmptyMessage>
      ) : (
        <CardList
          elements={remedies}
          onBookmarkToggle={handleBookmarkToggle}
          currentPath={currentPath}
        />
      )}
    </>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      initialSymptom: query.symptom || "",
    },
  };
}
