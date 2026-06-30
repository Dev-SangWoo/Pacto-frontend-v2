export function formatKoreanDate(value: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function formatDeadlineDday(value: string): string {
  const target = new Date(value);

  if (Number.isNaN(target.getTime())) {
    return "D-day 확인 필요";
  }

  const today = startOfLocalDay(new Date());
  const deadline = startOfLocalDay(target);
  const diffDays = Math.round((deadline.getTime() - today.getTime()) / 86_400_000);

  if (diffDays === 0) {
    return "D-day";
  }

  return diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
}

function startOfLocalDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
