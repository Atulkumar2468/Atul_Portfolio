"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { sendBookingEmail, type BookingFormData } from "@/lib/emailjs";
import { TIME_SLOTS } from "@/lib/constants";

export default function Appointment() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    purpose: "",
    message: "",
  });

  // Generate calendar for current month
  const calendar = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = now.getDate();

    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    const days: (number | null)[] = [];

    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    return { days, today, monthName: monthNames[month], year };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingData: BookingFormData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      date: `${calendar.monthName} ${selectedDate}, ${calendar.year}`,
      timeSlot: selectedSlot || "",
      purpose: formData.purpose,
      message: formData.message,
    };

    try {
      await sendBookingEmail(bookingData);
      setShowSuccess(true);
      setFormData({ fullName: "", email: "", phone: "", purpose: "", message: "" });
      setSelectedDate(null);
      setSelectedSlot(null);
      setShowForm(false);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("Error sending booking:", error);
      alert("Failed to send booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="py-24 md:py-32 relative overflow-hidden" id="booking">
        <div
          ref={ref}
          className="container mx-auto px-5 md:px-20 max-w-[1200px] relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="glass-card p-8 md:p-16 lg:p-20 rounded-[32px] md:rounded-[40px] flex flex-col md:flex-row gap-12 md:gap-16 items-center"
          >
            {/* Left — CTA */}
            <div className="md:w-1/2 space-y-8">
              <h2 className="font-[family-name:var(--font-geist)] text-3xl md:text-[32px] font-semibold leading-tight">
                Let&apos;s build something{" "}
                <span className="text-[var(--color-primary)]">
                  extraordinary.
                </span>
              </h2>
              <p className="text-[var(--color-on-surface-variant)] text-lg">
                Schedule a 15-minute intro call to discuss your project or
                potential collaborations.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-[var(--color-background)] bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold">
                  A
                </div>
                <p className="text-[var(--color-on-surface-variant)] text-sm">
                  Join 5+ teams Atul has consulted for.
                </p>
              </div>
            </div>

            {/* Right — Calendar / Form */}
            <div className="md:w-1/2 w-full">
              <AnimatePresence mode="wait">
                {!showForm ? (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-[var(--color-background)]/50 p-6 md:p-8 rounded-3xl border border-white/10 space-y-6"
                  >
                    {/* Month Header */}
                    <div className="text-center font-[family-name:var(--font-geist)] font-semibold text-lg">
                      {calendar.monthName} {calendar.year}
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-2">
                      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                        <div
                          key={i}
                          className="text-center text-xs text-[var(--color-on-surface-variant)]"
                        >
                          {d}
                        </div>
                      ))}

                      {/* Calendar Days */}
                      {calendar.days.map((day, i) => (
                        <div key={i} className="h-10 flex items-center justify-center">
                          {day === null ? (
                            <span />
                          ) : day < calendar.today ? (
                            <span className="text-sm opacity-20">{day}</span>
                          ) : (
                            <button
                              onClick={() => setSelectedDate(day)}
                              className={`w-full h-full flex items-center justify-center text-sm rounded-lg transition-colors ${
                                selectedDate === day
                                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 font-bold"
                                  : "hover:bg-white/5 cursor-pointer"
                              }`}
                            >
                              {day}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Time Slots */}
                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        <p className="text-sm text-[var(--color-on-surface-variant)] font-[family-name:var(--font-mono)]">
                          Available slots for {calendar.monthName} {selectedDate}
                        </p>
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`w-full py-3 rounded-xl border text-left px-4 flex justify-between items-center transition-all ${
                              selectedSlot === slot
                                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                                : "border-white/10 hover:border-[var(--color-primary)]"
                            }`}
                          >
                            <span>{slot}</span>
                            <span className="text-[var(--color-primary)] text-xs font-bold">
                              AVAILABLE
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {/* Continue Button */}
                    <button
                      onClick={() => selectedDate && selectedSlot && setShowForm(true)}
                      disabled={!selectedDate || !selectedSlot}
                      className={`w-full py-4 font-bold rounded-xl mt-6 transition-all ${
                        selectedDate && selectedSlot
                          ? "bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:scale-[0.98]"
                          : "bg-white/5 text-white/30 cursor-not-allowed"
                      }`}
                    >
                      {selectedDate && selectedSlot
                        ? "Continue to Details"
                        : "Select Date & Time"}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="bg-[var(--color-background)]/50 p-6 md:p-8 rounded-3xl border border-white/10 space-y-5"
                  >
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-[var(--color-on-surface-variant)] text-sm flex items-center gap-1 hover:text-[var(--color-primary)] transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">
                        arrow_back
                      </span>
                      Back to calendar
                    </button>

                    <div className="text-sm text-[var(--color-primary)] font-[family-name:var(--font-mono)]">
                      {calendar.monthName} {selectedDate}, {calendar.year} •{" "}
                      {selectedSlot}
                    </div>

                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-white/10 focus:border-[var(--color-primary)] py-3 outline-none transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-white/10 focus:border-[var(--color-primary)] py-3 outline-none transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-white/10 focus:border-[var(--color-primary)] py-3 outline-none transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Purpose of Meeting"
                      required
                      value={formData.purpose}
                      onChange={(e) =>
                        setFormData({ ...formData, purpose: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-white/10 focus:border-[var(--color-primary)] py-3 outline-none transition-colors"
                    />
                    <textarea
                      placeholder="Any additional message..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-white/10 focus:border-[var(--color-primary)] py-3 outline-none resize-none transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[var(--color-primary)] text-[var(--color-on-primary)] font-bold rounded-xl hover:scale-[0.98] transition-transform disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Confirm Booking"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] glass-card px-8 py-4 rounded-2xl flex items-center gap-3 shadow-2xl"
          >
            <span className="material-symbols-outlined text-[var(--color-tertiary)]">
              check_circle
            </span>
            <span className="font-medium">
              Booking confirmed! Check your email for details.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
