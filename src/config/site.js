const isProd = process.env.NODE_ENV === "production";

const siteConfig = {
  name: "Agile Poker Planner | Planning Poker | Scrum Poker",
  description:
    "Collaboratively estimate and prioritize work stories with the Agile Poker Planner app.",
  url: isProd ? "https://www.agilepokerplanner.com" : "http://localhost:3000/",
};

export { siteConfig };
