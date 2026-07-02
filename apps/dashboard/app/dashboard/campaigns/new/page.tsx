import { CampaignCreateForm } from "./_components/campaign-create-form";

export default function NewCampaignPage() {
  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">New campaign</p>
          <h1>캠페인 등록</h1>
        </div>
      </header>

      <section className="panel campaign-create-panel">
        <div className="panel-heading">
          <div>
            <h2>기본 정보</h2>
            <p>캠페인명, 보상, 마감일, 미션 가이드를 입력하면 바로 등록돼요.</p>
          </div>
        </div>
        <CampaignCreateForm />
      </section>
    </>
  );
}
