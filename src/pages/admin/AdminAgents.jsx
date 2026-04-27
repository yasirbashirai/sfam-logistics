import SubmissionTable from './SubmissionTable.jsx'

export default function AdminAgents() {
  return <SubmissionTable
    bucket="agents"
    title="Agent Applications"
    columns={[
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'yearsExperience', label: 'Experience' },
      { key: 'currentCompany', label: 'Current Co.' },
      { key: 'bookOfBusiness', label: 'Book' }
    ]}
    formFields={[
      { key: 'name', label: 'Full name', placeholder: 'Jane Doe' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'jane@email.com' },
      { key: 'phone', label: 'Phone', placeholder: '206-555-0100' },
      { key: 'city', label: 'City', placeholder: 'Austin' },
      { key: 'state', label: 'State', placeholder: 'TX' },
      { key: 'yearsExperience', label: 'Years experience', type: 'select', options: ['1-3 years', '3-5 years', '5-10 years', '10+ years'] },
      { key: 'currentCompany', label: 'Current company', placeholder: 'Where they are now' },
      { key: 'bookOfBusiness', label: 'Book of business', type: 'select', options: ['None yet', 'Small (1-5 active accounts)', 'Medium (6-20 accounts)', 'Large (20+ accounts)'] },
      { key: 'monthlyRevenue', label: 'Avg monthly revenue', placeholder: '$50,000' },
      { key: 'whyJoin', label: 'Why they want to join', type: 'textarea', full: true }
    ]}
  />
}
