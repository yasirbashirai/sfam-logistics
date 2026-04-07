import SubmissionTable from './SubmissionTable.jsx'

export default function AdminAgents() {
  return <SubmissionTable bucket="agents" title="Agent Applications" columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'yearsExperience', label: 'Experience' },
    { key: 'currentCompany', label: 'Current Co.' },
    { key: 'bookOfBusiness', label: 'Book' }
  ]} />
}
