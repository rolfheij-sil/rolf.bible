import logo from "./../assets/images/logo.png";
import Typewriter from "typewriter-effect";
// import ThemeToggle from "../components/ThemeToggle";

const Header = () => {
  return (
    <header className="flex flex-col p-8">
      {/* <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div> */}

      <div className="flex flex-col justify-center sm:flex-row">
        <img
          className="h-52 object-contain p-4 transition-all duration-300 [html[data-theme='dark']_&]:brightness-75 [html[data-theme='dark']_&]:contrast-90 [html[data-theme='dark']_&]:opacity-90"
          src={logo}
          alt="Rolf.Bible"
        />
        <div className="content-center p-4 text-center">
          <span className="relative h-20 w-full overflow-hidden whitespace-pre-line text-7xl font-extrabold tracking-tight transition-all duration-300 text-white [html[data-theme='dark']_&]:text-black">{`Rolf\n.Bible`}</span>
        </div>
      </div>

      <div className="h-20 text-center text-3xl font-bold md:h-auto text-white [html[data-theme='dark']_&]:text-black">
        <Typewriter
          options={{
            strings: [
              "Software ontwikkelen voor Bijbelvertalers",
              "Totdat iedereen een Bijbel heeft!",
            ],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 20,
          }}
        />
      </div>
    </header>
  );
};

export default Header;
