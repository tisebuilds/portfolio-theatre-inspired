import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dinner Party Seating Chart",
  description: "Videos and photos from the Dinner Party Seating Chart project.",
};

export default function DinnerPartySeatingChartPage() {
  redirect("/?ch=8");
}
