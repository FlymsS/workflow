interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createAt: number;
}

export const seedData : SeedData = {
  entries: [
    {
      description: "Peninte: Ea duis commodo amet exercitation est incididunt.",
      status: "pending",
      createAt: Date.now(),
    },
    {
      description: "Progreso: Fugiat irure ex consequat consectetur aute.",
      status: "in-progres",
      createAt: Date.now()-1000000,
    },
    {
      description: "terminada: Est qui irure laborum ex esse quis cupidatat.",
      status: "finished",
      createAt: Date.now()-100000000,
    },
  ]
}