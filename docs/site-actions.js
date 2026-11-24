export const DEPOT_DATA = {
  updatedAt: "2026-11-24T09:00:00Z",
  depots: [
    {
      code: "DEPOT-NORTH-01",
      name: "Harborview Solar Medical Depot",
      distanceKm: 1.4,
      coldChainTempC: 4.2,
      solarAutonomyHours: 72,
      stepFreeBay: true,
      items: {
        insulin_glargine_pens: 48,
        peritoneal_dialysis_kits: 14,
        portable_oxygen_concentrators: 9,
        pediatric_inhaler_packs: 32
      }
    },
    {
      code: "DEPOT-EAST-02",
      name: "Civic Annex Mobile Pharmacy",
      distanceKm: 2.9,
      coldChainTempC: 5.1,
      solarAutonomyHours: 48,
      stepFreeBay: true,
      items: {
        insulin_glargine_pens: 22,
        peritoneal_dialysis_kits: 6,
        portable_oxygen_concentrators: 15,
        pediatric_inhaler_packs: 45
      }
    }
  ]
};

export function registerActions(actions) {
  actions.register({
    name: "get_depot_inventory",
    description: "Read live emergency medical supply counts and step-free pickup bays across regional depots. Read-only.",
    effect: "read",
    parameters: { type: "object", properties: {}, additionalProperties: false },
    handler: async () => ({ ok: true, ...DEPOT_DATA })
  });

  actions.register({
    name: "check_cold_chain_stock",
    description: "Check 2-8C solar refrigeration telemetry and battery hours for temperature-sensitive biologics. Read-only.",
    effect: "read",
    parameters: {
      type: "object",
      properties: {
        category: { type: "string", description: "Supply category such as insulin, dialysis, oxygen, or pediatric." }
      },
      additionalProperties: false
    },
    handler: async ({ category = "insulin" } = {}) => ({
      ok: true,
      category,
      verifiedRangeC: "2.0C - 8.0C",
      depots: DEPOT_DATA.depots.map((d) => ({
        code: d.code,
        name: d.name,
        coldChainTempC: d.coldChainTempC,
        solarAutonomyHours: d.solarAutonomyHours,
        items: d.items
      }))
    })
  });
}
