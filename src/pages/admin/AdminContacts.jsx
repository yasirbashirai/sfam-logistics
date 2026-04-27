import SubmissionTable from './SubmissionTable.jsx'

export default function AdminContacts() {
  return <SubmissionTable
    bucket="contacts"
    title="Contact Form Messages"
    columns={[
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'subject', label: 'Subject' }
    ]}
    formFields={[
      { key: 'name', label: 'Full name', placeholder: 'Customer name' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'customer@email.com' },
      { key: 'phone', label: 'Phone', placeholder: '206-555-0100' },
      { key: 'subject', label: 'Subject', full: true, placeholder: 'Question about LTL rates' },
      { key: 'message', label: 'Message', type: 'textarea', full: true, placeholder: 'What did they say?' }
    ]}
  />
}
