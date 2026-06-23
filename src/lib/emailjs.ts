import emailjs from "@emailjs/browser";
import { saveContactSubmission, saveBookingSubmission } from "./supabase";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_zb6lv68";
const CONTACT_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_pc2zqjz";
const BOOKING_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID || "template_yegu5ju";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "_xrmYPcl7mLaVWEoK";

export function initEmailJS() {
  if (PUBLIC_KEY) {
    emailjs.init(PUBLIC_KEY);
  }
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  purpose: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  if (!PUBLIC_KEY || !SERVICE_ID || !CONTACT_TEMPLATE_ID) {
    console.warn("EmailJS not configured. Simulating send...");
    return { status: 200, text: "OK (simulated)" };
  }

  const result = await emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, {
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
    to_email: "atulindian2004@gmail.com",
  });

  // Save to Supabase
  await saveContactSubmission(data);

  return result;
}

export async function sendBookingEmail(data: BookingFormData) {
  if (!PUBLIC_KEY || !SERVICE_ID || !BOOKING_TEMPLATE_ID) {
    console.warn("EmailJS not configured. Simulating send...");
    return { status: 200, text: "OK (simulated)" };
  }

  // Send booking details to owner
  const ownerResult = await emailjs.send(SERVICE_ID, BOOKING_TEMPLATE_ID, {
    full_name: data.fullName,
    email: data.email,
    phone: data.phone,
    date: data.date,
    time_slot: data.timeSlot,
    purpose: data.purpose,
    message: data.message,
    to_email: "atulindian2004@gmail.com",
  });

  // Save to Supabase
  await saveBookingSubmission(data);

  return ownerResult;
}
