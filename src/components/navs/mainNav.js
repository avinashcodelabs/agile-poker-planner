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
            className="hover:bg-gray-400 bg-gray-200 rounded-full p-1 md:p-2"
            href="https://github.com/avinashcodelabs/agile-poker-planner"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub className="cursor-pointer LandingPageIcon" />
          </a>
          <a
            className="hover:bg-gray-400 bg-gray-200 rounded-full p-1 md:p-2"
            href="https://twitter.com/agilepokerplan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter className="cursor-pointer LandingPageIcon" />
          </a>
        </div>
      </div>
    </header>
  );
}

export { MainNav };
