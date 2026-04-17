import Layout from "./components/Layout";
import AboutSection from "./sections/AboutSection";
import CollectionsSection from "./sections/CollectionsSection";
import ContactSection from "./sections/ContactSection";
import HeroSection from "./sections/HeroSection";

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <CollectionsSection />
      <ContactSection />
    </Layout>
  );
}
