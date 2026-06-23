import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wmbsfjdyhwzljekbshgg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_84OQP2fbLdTGlOPa3Fgc6Q_rhYVGhAQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Save contact form submission
export async function saveContactSubmission(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { error } = await supabase.from("submissions").insert({
    type: "contact",
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  if (error) {
    console.error("Supabase insert error:", error);
  }
}

// Save booking form submission
export async function saveBookingSubmission(data: {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  purpose: string;
  message: string;
}) {
  const { error } = await supabase.from("submissions").insert({
    type: "booking",
    name: data.fullName,
    email: data.email,
    subject: data.purpose,
    message: data.message,
    phone: data.phone,
    date: data.date,
    time_slot: data.timeSlot,
    purpose: data.purpose,
  });

  if (error) {
    console.error("Supabase insert error:", error);
  }
}
