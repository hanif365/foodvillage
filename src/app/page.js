import Header from "@/components/HomePageComponents/Header/Header";
import PhotoGallery from "@/components/HomePageComponents/PhotoGallery/PhotoGallery";

export default function Home() {
  return (
    <main className="bg-[url('/bg_body.jpg')] bg-no-repeat bg-cover">
      <Header />
      <PhotoGallery />
    </main>
  )
}
