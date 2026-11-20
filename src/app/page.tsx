import { HomeController } from "@/controllers/home.controller";
import { HomeView } from "@/components/home-view/HomeView";

export const revalidate = 60;

export default async function HomePage() {
  const data = await HomeController.getPage();
  return <HomeView data={data} />;
}
