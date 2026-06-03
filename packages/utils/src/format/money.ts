export function formatPoint(value: number): string {
  return `${new Intl.NumberFormat("ko-KR").format(value)}P`;
}

export function formatWon(value: number): string {
  return `${new Intl.NumberFormat("ko-KR").format(value)}원`;
}
