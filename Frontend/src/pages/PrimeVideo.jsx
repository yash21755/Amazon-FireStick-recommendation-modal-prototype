import React from "react";
import AdBanner from "../components/AdBanner";
import RowSection from "../components/RowSection";

const PrimeVideo = () => {
  const dummyData = [
    { id: 1, title: "The Boys", img: "https://via.placeholder.com/150x220", rating: 8.7 },
    { id: 2, title: "Jack Ryan", img: "https://via.placeholder.com/150x220", rating: 8.1 },
    { id: 3, title: "Reacher", img: "https://via.placeholder.com/150x220", rating: 8.2 },
    { id: 4, title: "Upload", img: "https://via.placeholder.com/150x220", rating: 7.9 },
    { id: 5, title: "Citadel", img: "https://via.placeholder.com/150x220", rating: 7.3 },
  ];

  return (
    <div className="w-full min-h-screen bg-[#232f3e] text-white space-y-10">
      <AdBanner />
      <RowSection title="Trending in Your Region" items={dummyData} />
      <RowSection title="Explore" items={dummyData} />
      <RowSection title="Because You Watched 'The Boys'" items={dummyData} />
      <RowSection title="New Releases" items={dummyData} />
      <RowSection title="Highly Acclaimed (IMDb Sorted)" items={[...dummyData].sort((a, b) => b.rating - a.rating)} />
      <RowSection title="Top Action Movies" items={dummyData} />
      <RowSection title="Hollywood Greats" items={dummyData} />
    </div>
  );
};

export default PrimeVideo;