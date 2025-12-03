import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Header />
      <div className="grow w-full grid grid-cols-2 place-items-center"></div>
      <Footer />
    </div>
  );
}
