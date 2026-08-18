export type Contact = {
  id: string;
  name: string;
  phone: string;
  primary?: boolean;
  initials: string;
};

export type Alert = {
  id: string;
  title: string;
  time: string;
  location: string;
  status: string;
  tone: "sos" | "active" | "warn" | "brand";
};

export const initialContacts: Contact[] = [
  { id: "1", name: "Marina Alves", phone: "+55 11 98877-1200", primary: true, initials: "MA" },
  { id: "2", name: "Rafael Costa", phone: "+55 11 99123-4567", initials: "RC" },
  { id: "3", name: "Central 190", phone: "190", initials: "190" },
];

export const initialAlerts: Alert[] = [
  {
    id: "a1",
    title: "SOS acionado",
    time: "Hoje · 21:14",
    location: "Av. Paulista, 1500 — São Paulo",
    status: "Resolvido",
    tone: "active",
  },
  {
    id: "a2",
    title: "Proteção ativada",
    time: "Ontem · 19:02",
    location: "Rua Augusta, 900 — São Paulo",
    status: "Encerrado",
    tone: "brand",
  },
  {
    id: "a3",
    title: "Localização instável",
    time: "12 ago · 08:41",
    location: "Sinal fraco de GPS",
    status: "Atenção",
    tone: "warn",
  },
];
