import SubmissionTable from './SubmissionTable.jsx'

export default function AdminContacts() {
  return <SubmissionTable bucket="contacts" title="Contact Form Messages" columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'subject', label: 'Subject' }
  ]} />
}
