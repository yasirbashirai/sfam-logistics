import SubmissionTable from './SubmissionTable.jsx'

export default function AdminCarriers() {
  return <SubmissionTable
    bucket="carriers"
    title="Carrier Onboarding"
    columns={[
      { key: 'company', label: 'Company' },
      { key: 'mc', label: 'MC' },
      { key: 'dot', label: 'DOT' },
      { key: 'contactName', label: 'Contact' },
      { key: 'phone', label: 'Phone' },
      { key: 'fleetSize', label: 'Fleet' }
    ]}
    formFields={[
      { key: 'company', label: 'Company name', placeholder: 'Pacific Trans LLC' },
      { key: 'mc', label: 'MC number', placeholder: 'MC-123456' },
      { key: 'dot', label: 'USDOT number', placeholder: '1234567' },
      { key: 'contactName', label: 'Contact name', placeholder: 'Driver / dispatcher' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'contact@carrier.com' },
      { key: 'phone', label: 'Phone', placeholder: '206-555-0100' },
      { key: 'city', label: 'City', placeholder: 'Tacoma' },
      { key: 'state', label: 'State', placeholder: 'WA' },
      { key: 'zip', label: 'ZIP', placeholder: '98401' },
      { key: 'fleetSize', label: 'Fleet size', type: 'select', options: ['Owner-operator (1)', '2-5 trucks', '6-15 trucks', '16-50 trucks', '50+ trucks'] },
      { key: 'lanes', label: 'Preferred lanes', placeholder: 'PNW to CA, OTR' },
      { key: 'notes', label: 'Notes', type: 'textarea', full: true }
    ]}
  />
}
