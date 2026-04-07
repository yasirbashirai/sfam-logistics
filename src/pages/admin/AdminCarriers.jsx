import SubmissionTable from './SubmissionTable.jsx'

export default function AdminCarriers() {
  return <SubmissionTable bucket="carriers" title="Carrier Onboarding" columns={[
    { key: 'company', label: 'Company' },
    { key: 'mc', label: 'MC' },
    { key: 'dot', label: 'DOT' },
    { key: 'contactName', label: 'Contact' },
    { key: 'phone', label: 'Phone' },
    { key: 'fleetSize', label: 'Fleet' }
  ]} />
}
