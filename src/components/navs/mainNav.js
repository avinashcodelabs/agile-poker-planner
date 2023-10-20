import { Logo } from "@/components/navs/logo";

function MainNav() {
  return (
    <header className="p-2 relative z-30 bg-base-100">
      <div className="container mx-auto flex gap-2 justify-between">
        <Logo />
      </div>
    </header>
  );
}

export { MainNav };
