-- PostgreSQL схем: Лаб 11-ийн ERD-тэй нийцсэн
-- ТАСАГ -> department, ЭМЧ -> doctor, ӨВЧТӨН -> patient,
-- ЦАГИЙН_ХУВААРЬ -> schedule_slot, ЦАГ_ЗАХИАЛГА -> appointment

CREATE TABLE department (
  department_id  SERIAL PRIMARY KEY,
  name           VARCHAR(50) NOT NULL UNIQUE,
  location       VARCHAR(40) NOT NULL,
  phone          VARCHAR(12)
);

CREATE TABLE doctor (
  doctor_code    VARCHAR(6) PRIMARY KEY,
  name           VARCHAR(50) NOT NULL,
  specialty      VARCHAR(50) NOT NULL,
  phone          VARCHAR(12),
  email          VARCHAR(50),
  department_id  INT NOT NULL REFERENCES department (department_id)
);

CREATE TABLE patient (
  patient_code   VARCHAR(6) PRIMARY KEY,
  register_no    VARCHAR(10) NOT NULL UNIQUE,
  name           VARCHAR(50) NOT NULL,
  gender         VARCHAR(2) NOT NULL CHECK (gender IN ('Эр', 'Эм')),
  birth_date     DATE NOT NULL,
  phone          VARCHAR(12) NOT NULL,
  email          VARCHAR(50)
);

CREATE TABLE schedule_slot (
  slot_id        SERIAL PRIMARY KEY,
  doctor_code    VARCHAR(6) NOT NULL REFERENCES doctor (doctor_code),
  slot_date      DATE NOT NULL,
  start_time     TIME NOT NULL,
  end_time       TIME NOT NULL,
  status         VARCHAR(10) NOT NULL DEFAULT 'чөлөөтэй'
                 CHECK (status IN ('чөлөөтэй', 'захиалсан', 'хаалттай')),
  CHECK (end_time > start_time),
  UNIQUE (doctor_code, slot_date, start_time)
);

CREATE TABLE appointment (
  appointment_id SERIAL PRIMARY KEY,
  patient_code   VARCHAR(6) NOT NULL REFERENCES patient (patient_code),
  slot_id        INT NOT NULL REFERENCES schedule_slot (slot_id),
  created_date   DATE NOT NULL DEFAULT CURRENT_DATE,
  status         VARCHAR(15) NOT NULL DEFAULT 'хүлээгдэж буй'
                 CHECK (status IN ('хүлээгдэж буй', 'ирсэн', 'ирээгүй', 'цуцлагдсан')),
  note           VARCHAR(100)
);

-- Нэг цагт зөвхөн нэг идэвхтэй (цуцлагдаагүй) захиалга байх бизнесийн дүрэм
CREATE UNIQUE INDEX uq_active_appointment_per_slot
  ON appointment (slot_id) WHERE status <> 'цуцлагдсан';

-- Гүйцэтгэлийн NFR: цаг хайлт ≤ 2 сек
CREATE INDEX idx_slot_doctor_date ON schedule_slot (doctor_code, slot_date);
CREATE INDEX idx_appointment_patient ON appointment (patient_code);
