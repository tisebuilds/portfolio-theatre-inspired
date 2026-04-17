import { redirect } from "next/navigation";

export default function AboutPage() {
  redirect("/?ch=1&view=about");
}
