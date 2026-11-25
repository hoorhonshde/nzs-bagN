'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { SLOT, APPT, overlaps, canCancel, isSlotBookable } = require('../src/appointmentRules');

test('overlaps: давхцсан завсарыг илрүүлнэ', () => {
  const a = { start: '2026-11-12T09:00', end: '2026-11-12T09:30' };
  const b = { start: '2026-11-12T09:15', end: '2026-11-12T09:45' };
  assert.equal(overlaps(a, b), true);
});

test('overlaps: дараалсан завсар давхцахгүй', () => {
  const a = { start: '2026-11-12T09:00', end: '2026-11-12T09:30' };
  const b = { start: '2026-11-12T09:30', end: '2026-11-12T10:00' };
  assert.equal(overlaps(a, b), false);
});

test('canCancel: 2 цагаас илүү үлдсэн бол цуцалж болно', () => {
  assert.equal(canCancel('2026-11-12T09:00', '2026-11-12T06:30'), true);
});

test('canCancel: 2 цагаас бага үлдсэн бол цуцалж болохгүй', () => {
  assert.equal(canCancel('2026-11-12T09:00', '2026-11-12T08:00'), false);
});

test('isSlotBookable: чөлөөтэй цаг захиалагдана', () => {
  assert.equal(isSlotBookable({ id: 9, status: SLOT.FREE }, []), true);
});

test('isSlotBookable: идэвхтэй захиалгатай цаг захиалагдахгүй', () => {
  const appts = [{ slotId: 5, status: APPT.PENDING }];
  assert.equal(isSlotBookable({ id: 5, status: SLOT.FREE }, appts), false);
});

test('isSlotBookable: цуцлагдсан захиалга саад болохгүй', () => {
  const appts = [{ slotId: 6, status: APPT.CANCELLED }];
  assert.equal(isSlotBookable({ id: 6, status: SLOT.FREE }, appts), true);
});

test('isSlotBookable: хаалттай цаг захиалагдахгүй', () => {
  assert.equal(isSlotBookable({ id: 12, status: SLOT.CLOSED }, []), false);
});
