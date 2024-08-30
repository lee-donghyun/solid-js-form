import { Header } from "./ui/layout/header";

export const App = () => {
  return (
    <>
      <Header />
      <main class="container px-5 mx-auto mt-32">
        <h1 class="text-xl font-medium">
          여기에서부터 설문조사 콘솔이 시작합니다.
        </h1>
      </main>
    </>
  );
};
