declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      eventParams?: Record<string, string>
    ) => void;
  }
}

export function trackWaitlistSignup() {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "waitlist_signup", {
      event_category: "engagement",
      event_label: "waitlist",
    });
  }
}
