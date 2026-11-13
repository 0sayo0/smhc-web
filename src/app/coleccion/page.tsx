import { permanentRedirect } from "next/navigation";

export default function LegacyCollectionsPage() {
  permanentRedirect("/colecciones");
}
