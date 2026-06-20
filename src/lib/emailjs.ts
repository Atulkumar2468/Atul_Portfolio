import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const CONTACT_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const BOOKING_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID || "";
const CONFIRMATION_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

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

  // Send confirmation to visitor
  if (CONFIRMATION_TEMPLATE_ID) {
    await emailjs.send(SERVICE_ID, CONFIRMATION_TEMPLATE_ID, {
      to_name: data.fullName,
      to_email: data.email,
      date: data.date,
      time_slot: data.timeSlot,
      from_name: "Atul Kumar",
    });
  }

  // Save booking data locally
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  bookings.push({ ...data, createdAt: new Date().toISOString() });
  localStorage.setItem("bookings", JSON.stringify(bookings));

  return ownerResult;
}
