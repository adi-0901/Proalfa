const userAgent = process.env.npm_config_user_agent || "";
const execPath = process.env.npm_execpath || "";

const isYarn = userAgent.includes("yarn/") || execPath.includes("yarn");

if (!isYarn) {
  console.error("\nThis project is Yarn-only.");
  console.error("Use `yarn install` and `yarn <script>` commands.\n");
  process.exit(1);
}