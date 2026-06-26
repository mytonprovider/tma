const SECTIONS = [9, 5, 5, 2];

function SkeletonSection({ rows }: { rows: number }) {
  return (
    <>
      <div className="ts-skel" style={{ height: 13, width: '32%', borderRadius: 6, margin: '22px 0 8px' }} />
      <div className="ts-card">
        {Array.from({ length: rows }).map((_, index) => (
          <div className="ts-field" key={index}>
            <span className="ts-skel" style={{ width: 92, height: 12 }} />
            <span className="ts-skel" style={{ width: '40%', height: 12 }} />
          </div>
        ))}
      </div>
    </>
  );
}

export function ProviderDetailSkeleton() {
  return (
    <div className="ts-scroll">
      <div className="ts-skel" style={{ height: 116, borderRadius: 12, marginTop: 10 }} />
      <div className="ts-tiles" style={{ marginTop: 12 }}>
        <div className="ts-skel" style={{ height: 62, borderRadius: 10 }} />
        <div className="ts-skel" style={{ height: 62, borderRadius: 10 }} />
        <div className="ts-skel" style={{ height: 62, borderRadius: 10 }} />
      </div>
      {SECTIONS.map((rows, index) => (
        <SkeletonSection key={index} rows={rows} />
      ))}
      <div className="ts-skel" style={{ height: 50, borderRadius: 12, marginTop: 22 }} />
    </div>
  );
}
