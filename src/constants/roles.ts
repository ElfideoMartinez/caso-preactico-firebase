export type RoleOptions = "admin" | "user" | "provider" | "sales";

export const roleSelectOptions = [
  { value: "admin", label: "Administrador" },
  { value: "user", label: "Usuario" },
  { value: "provider", label: "Provedor" },
  { value: "sales", label: "Ventas" },
];

export const allowedRoutesByRole: Record<RoleOptions, string[]> = {
  admin: ["/pedidos", "/productos", "/inventory", "/users", "/sales"],
  user: ["/pedidos", "/productos"],
  provider: ["/inventory"],
  sales: ["/productos", "/inventory", "/sales"],
};

export const roleHome: Record<RoleOptions, string> = {
  admin: "/productos",
  user: "/productos",
  sales: "/productos",
  provider: "/inventory",
};
