const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchServices() {
  const res = await fetch(`${API_URL}/api/services`);
  if (!res.ok) throw new Error("Failed to load services");
  return res.json();
}

export async function sendInquiry(payload) {
  const res = await fetch(`${API_URL}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Failed to send inquiry");
  return data;
}
