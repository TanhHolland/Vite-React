import { Outlet } from "react-router";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { useAppSelector } from "../app/hook";
export default function Root() {
  const darkMode = useAppSelector((state) => state.darkMode.value);
  return (
    <>
      <main className={`${darkMode} text-foreground bg-background`}>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
      </main>
    </>
  );
}
