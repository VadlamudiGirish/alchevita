import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import CardList from "@/components/CardList/CardList";
import RemedyFilter from "@/components/RemedyFilter/RemedyFilter";
import { useBookmarks } from "@/hooks/useBookmarks";
import { getSession } from "next-auth/react";

const EmptyMessage = styled.p`
  margin: 2rem 0;
  text-align: center;
  color: #666;
`;
export default function BookmarkedPage({ initialSymptom }) {
  const router = useRouter();
  const [selectedSymptom, setSelectedSymptom] = useState(initialSymptom || "");
  const currentPath = router.pathname;

  useEffect(() => {
    setSelectedSymptom(router.query.symptom || "");
  }, [router.query.symptom]);

  // Get bookmark functionality
  const { toggle } = useBookmarks();

  // Get remedies with combined filters
  const {
    data: remedies = [],
    isLoading,
    error,
    mutate,
  } = useSWR(
    selectedSymptom
      ? `/api/remedies?bookmarked=true&symptom=${encodeURIComponent(
          selectedSymptom
        )}`
      : `/api/remedies?bookmarked=true`,
    {
      fallbackData: [],
    }
  );

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

  if (isLoading) return <EmptyMessage title="Loading..." />;
  if (error) {
    console.error(error);
    return <EmptyMessage title="Error fetching data" />;
  }

  return (
    <>
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

BookmarkedPage.pageTitle = "My Remedies";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const initialSymptom = context.query.symptom || "";

  return {
    props: {
      session,
      initialSymptom,
    },
  };
}
