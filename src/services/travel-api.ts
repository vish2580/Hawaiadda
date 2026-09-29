import type { AssistantMessage, SearchAcknowledgement, SearchInput } from "@/types/travel";

const wait = (duration: number) => new Promise((resolve) => window.setTimeout(resolve, duration));

// Explicit frontend boundary. These methods return acknowledgements, never invented inventory.
// Replace them with authenticated providers before displaying live fares or availability.
export const travelApi = {
  async submitSearch(input: SearchInput): Promise<SearchAcknowledgement> {
    await wait(450);
    return {
      requestId: crypto.randomUUID(),
      status: "demo-only",
      message: `Live ${input.service} inventory is not connected in this preview. No reservation has been made. You can keep exploring or adjust your journey.`,
    };
  },
  async askAssistant(messages: AssistantMessage[]) {
    await wait(650);
    void messages;
    return "Adda AI is not connected yet. For now, explore our destinations or use the mood selector to find inspiration. Your message has not been sent to an AI service.";
  },
};
