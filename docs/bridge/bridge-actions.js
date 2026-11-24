import { DEPOT_DATA } from "../site-actions.js";

export function registerActions(actions) {
  actions.register({
    name: "get_depot_inventory",
    description: "Read live emergency medical supply counts and step-free pickup bays across regional depots. Changes nothing.",
    effect: "read",
    availability: "bridge",
    callers: ["*"],
    parameters: { type: "object", properties: {}, additionalProperties: false },
    handler: async () => ({ ok: true, ...DEPOT_DATA })
  });

  actions.register({
    name: "check_cold_chain_stock",
    description: "Read 2-8C solar refrigeration telemetry and backup battery hours for insulin and biologics. Changes nothing.",
    effect: "read",
    availability: "bridge",
    callers: ["*"],
    parameters: {
      type: "object",
      properties: {
        category: { type: "string", description: "Supply category to verify." }
      },
      additionalProperties: false
    },
    handler: async ({ category = "insulin" } = {}) => ({
      ok: true,
      category,
      verifiedRangeC: "2.0C - 8.0C",
      depots: DEPOT_DATA.depots
    })
  });
}
