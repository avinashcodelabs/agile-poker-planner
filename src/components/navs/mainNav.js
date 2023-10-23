import { Logo } from "@/components/navs/logo";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";

function MainNav() {
  return (
    <header className="p-2 relative z-30 bg-base-100">
      <div className="container mx-auto flex gap-2 justify-between">
        <Logo />
        <div className="flex gap-8 me-6 items-center">
          <a
            className="hover:bg-gray-400 bg-gray-200 rounded-full p-3"
            href="https://github.com/avinashcodelabs/agile-poker-planner"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub size="1.5em" className="cursor-pointer " />
          </a>
          <a
            className="hover:bg-gray-400 bg-gray-200 rounded-full p-3"
            href="https://twitter.com/agilepokerplan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter size="1.5em" className="cursor-pointer" />
          </a>
        </div>
      </div>
    </header>
  );
}

export { MainNav };
