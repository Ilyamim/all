import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Table } from '../../../components/ui/Table';

const OrganizerEventManage: React.FC = () => {
  const { id } = useParams();
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    const createQr = async () => {
      const url = `${window.location.origin}/checkin?eventId=${id}&token=sample-token`;
      const dataUrl = await QRCode.toDataURL(url);
      setQrUrl(dataUrl);
    };
    createQr();
  }, [id]);

  const handleExport = () => {
    const csv = 'Volunteer,Status\nAlex,checked_in\nSam,joined';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `event-${id}-attendance.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-display">Manage event</h1>
        <p className="text-sm text-muted">Review attendance and approve hours.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">Check-in QR</h2>
          <p className="text-sm text-muted">Share this QR on-site.</p>
          {qrUrl && <img className="mt-4 w-40" src={qrUrl} alt="Check-in QR" />}
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Attendance actions</h2>
          <p className="text-sm text-muted">Bulk approve volunteer hours.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button>Approve all</Button>
            <Button variant="secondary" onClick={handleExport}>
              Export CSV
            </Button>
          </div>
        </Card>
      </div>
      <Card>
        <Table headers={['Volunteer', 'Status', 'Hours', 'Action']}>
          {['Alex Rivera', 'Sam Lee'].map((name) => (
            <tr key={name} className="text-sm">
              <td className="px-4 py-3 font-semibold">{name}</td>
              <td className="px-4 py-3 text-muted">Checked in</td>
              <td className="px-4 py-3">3</td>
              <td className="px-4 py-3">
                <Button variant="ghost">Approve</Button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
};

export default OrganizerEventManage;
