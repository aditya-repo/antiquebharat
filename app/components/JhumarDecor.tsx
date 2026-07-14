import jhumarImg from "@/app/assets/elements/jhumar.png";

export function JhumarDecor() {
  return (
    <>
      <img src={jhumarImg.src} alt="Jhumar" className="jhumar jhumar-left" />
      <img src={jhumarImg.src} alt="Jhumar" className="jhumar jhumar-right" />
    </>
  );
}
