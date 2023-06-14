const mapping: Record<string, string> = {
  'connection-requests': 'connection_request',
  farmers: 'farmer',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
