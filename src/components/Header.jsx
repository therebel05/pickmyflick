import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h2
          className="text-4xl font-bold tracking-tight text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-red-500">CINE</span>Sense
        </h2>
      </div>
    </div>
  );
};

export default Header;
