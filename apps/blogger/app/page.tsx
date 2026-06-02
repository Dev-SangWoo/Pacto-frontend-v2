const campaignSummaries = [
  {
    id: 1,
    brand: "성수 브런치 카페",
    title: "주말 브런치 체험단",
    reward: "50,000P",
    status: "모집 중",
  },
  {
    id: 2,
    brand: "홍대 네일 스튜디오",
    title: "신규 오픈 리뷰 캠페인",
    reward: "40,000P",
    status: "모집 완료",
  },
];

export default function BloggerHomePage() {
  return (
    <main className="blogger-shell">
      <section className="hero-section" aria-labelledby="home-title">
        <p className="eyebrow">Pacto Blogger</p>
        <h1 id="home-title">참여 가능한 캠페인을 확인하세요</h1>
        <p className="hero-copy">
          캠페인 지원부터 미션 제출, 정산 확인까지 모바일에서 빠르게 진행합니다.
        </p>
      </section>

      <section className="campaign-list" aria-label="추천 캠페인">
        {campaignSummaries.map((campaign) => (
          <article className="campaign-card" key={campaign.id}>
            <div>
              <p className="brand-name">{campaign.brand}</p>
              <h2>{campaign.title}</h2>
            </div>
            <div className="campaign-meta">
              <strong>{campaign.reward}</strong>
              <span>{campaign.status}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
