// 確認画面用ヘルパーコンポーネント - Minimal Style with 40px spacing
export const FormRow = ({ label, value, isLast = false }: { label: string, value: string, isLast?: boolean }) => (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid #E5E5E5', paddingBottom: isLast ? '0' : '24px', marginBottom: isLast ? '0' : '40px' }}>
        <dt className="text-[#333]" style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>{label}</dt>
        <dd className="text-[#050A14] whitespace-pre-wrap leading-relaxed" style={{ fontSize: '16px' }}>{value}</dd>
    </div>
);
