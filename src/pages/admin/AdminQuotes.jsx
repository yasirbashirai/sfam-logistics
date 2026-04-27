import SubmissionTable from './SubmissionTable.jsx'

export default function AdminQuotes() {
  return <SubmissionTable
    bucket="quotes"
    title="Quote Requests"
    columns={[
      { key: 'name', label: 'Contact' },
      { key: 'company', label: 'Company' },
      { key: 'lane', label: 'Lane', render: r => `${r.originCity || '?'} → ${r.destCity || '?'}` },
      { key: 'freightType', label: 'Type' },
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
      { key: 'freightType', label: 'Freight type', type: 'select', options: ['Full Truckload (FTL)', 'LTL', 'Reefer', 'Flatbed', 'Expedited', 'Dedicated'] },
      { key: 'equipment', label: 'Equipment', type: 'select', options: ['Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Power Only', 'Other'] },
      { key: 'weight', label: 'Weight (lbs)', placeholder: '40000' },
      { key: 'commodity', label: 'Commodity', placeholder: 'General freight' },
      { key: 'notes', label: 'Notes', type: 'textarea', full: true, placeholder: 'Anything else we should know...' }
    ]}
  />
}
