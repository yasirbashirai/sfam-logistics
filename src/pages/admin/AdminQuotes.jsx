import SubmissionTable from './SubmissionTable.jsx'

export default function AdminQuotes() {
  return <SubmissionTable
    bucket="quotes"
    title="Quote Requests"
    columns={[
      { key: 'name', label: 'Contact' },
      { key: 'company', label: 'Company' },
      { key: 'requestType', label: 'Request' },
      { key: 'lane', label: 'Lane', render: r => `${r.originCity || r.origin || '?'} → ${r.destCity || r.destination || '?'}` },
      { key: 'freightType', label: 'Freight' },
      { key: 'weight', label: 'Weight' }
    ]}
    formFields={[
      { key: 'name', label: 'Contact name', placeholder: 'John Smith' },
      { key: 'company', label: 'Company', placeholder: 'Acme Co' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'john@acme.com' },
      { key: 'phone', label: 'Phone', placeholder: '206-555-0100' },
      { key: 'originCity', label: 'Origin city', placeholder: 'Seattle, WA' },
      { key: 'originZip', label: 'Origin ZIP', placeholder: '98101' },
      { key: 'destCity', label: 'Destination city', placeholder: 'Los Angeles, CA' },
      { key: 'destZip', label: 'Destination ZIP', placeholder: '90001' },
      { key: 'requestType', label: 'Request type', type: 'select', options: ['Spot Quote', 'Recurring Freight', 'Other'] },
      { key: 'freightType', label: 'Freight type', type: 'select', options: ['Produce', 'Refrigerated', 'Dry Van', 'Other'] },
      { key: 'equipment', label: 'Equipment', type: 'select', options: ['Refrigerated (Reefer)', 'Dry Van', 'Other', 'Not Sure'] },
      { key: 'temp', label: 'Required temperature', placeholder: '34°F' },
      { key: 'weight', label: 'Weight (lbs)', placeholder: '40000' },
      { key: 'commodity', label: 'Commodity', placeholder: 'General freight' },
      { key: 'notes', label: 'Notes', type: 'textarea', full: true, placeholder: 'Anything else we should know...' }
    ]}
  />
}
