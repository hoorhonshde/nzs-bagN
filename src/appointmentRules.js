'use strict';

// Цагийн төлөв (ERD: ЦАГИЙН_ХУВААРЬ.төлөв)
const SLOT = { FREE: 'чөлөөтэй', BOOKED: 'захиалсан', CLOSED: 'хаалттай' };
// Захиалгын төлөв (ERD: ЦАГ_ЗАХИАЛГА.төлөв)
const APPT = { PENDING: 'хүлээгдэж буй', ATTENDED: 'ирсэн', MISSED: 'ирээгүй', CANCELLED: 'цуцлагдсан' };

/**
 * Нэг эмчийн хоёр цагийн завсар давхцаж байгаа эсэх.
 * Хугацаа нь [start, end) хагас нээлттэй: нэг нь дуусах мөчид нөгөө нь эхэлбэл давхцахгүй.
 */
function overlaps(a, b) {
  const aStart = new Date(a.start).getTime();
  const aEnd = new Date(a.end).getTime();
  const bStart = new Date(b.start).getTime();
  const bEnd = new Date(b.end).getTime();
  return aStart < bEnd && bStart < aEnd;
}

/** Цуцлалт зөвшөөрөгдөх эсэх: үзлэг эхлэхээс өмнө minHours цагаас илүү үлдсэн байх. */
function canCancel(slotStart, now = new Date(), minHours = 2) {
  const diffMs = new Date(slotStart).getTime() - new Date(now).getTime();
  return diffMs >= minHours * 60 * 60 * 1000;
}

/** Цаг захиалах боломжтой эсэх: чөлөөтэй төлөвтэй, идэвхтэй (цуцлагдаагүй) захиалгагүй. */
function isSlotBookable(slot, appointments) {
  if (slot.status !== SLOT.FREE) return false;
  return !appointments.some(
    (ap) => ap.slotId === slot.id && ap.status !== APPT.CANCELLED
  );
}

module.exports = { SLOT, APPT, overlaps, canCancel, isSlotBookable };
