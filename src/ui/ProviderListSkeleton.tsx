const ROWS = Array.from({ length: 10 });

export function ProviderListSkeleton() {
  return (
    <>
      <div className="ts-count">
        <span className="ts-skel" style={{ display: 'inline-block', width: 130, height: 12 }} />
      </div>
      <div className="ts-list">
        {ROWS.map((_, index) => (
          <div key={index} className="ts-row">
            <div className="ts-row__body">
              <div className="ts-skel" style={{ width: '52%', height: 13 }} />
              <div className="ts-skel" style={{ width: '34%', height: 11, marginTop: 8 }} />
              <div className="ts-skel" style={{ width: '64%', height: 11, marginTop: 8 }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
