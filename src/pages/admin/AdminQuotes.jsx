import SubmissionTable from './SubmissionTable.jsx'

export default function AdminQuotes() {
  return <SubmissionTable bucket="quotes" title="Quote Requests" columns={[
    { key: 'name', label: 'Contact' },
    { key: 'company', label: 'Company' },
    { key: 'lane', label: 'Lane', render: r => `${r.originCity || '?'} → ${r.destCity || '?'}` },
    { key: 'freightType', label: 'Type' },
    { key: 'weight', label: 'Weight' }
  ]} />
}
