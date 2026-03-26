import { HomePageContent } from "@/components/HomePageContent";
import workData from "@/data/work.json";
import type { WorkExperience } from "./types";

const experiences = workData as WorkExperience[];

export default function HomePage() {
  return <HomePageContent experiences={experiences} />;
}
