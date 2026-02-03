import React from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

const generatePlaceholderPdf = () => {
  const blob = new Blob(['BrightPath Volunteer Certificate'], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
};

const Certificates: React.FC = () => {
  const handleDownload = () => {
    const url = generatePlaceholderPdf();
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'certificate.pdf';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-display">Certificates</h1>
        <p className="text-sm text-muted">Download verified hours in a printable format.</p>
      </div>
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Neighborhood Cleanup</h2>
            <p className="text-sm text-muted">Issued Aug 14, 2024 • 3 hours</p>
          </div>
          <Button variant="secondary" onClick={handleDownload}>
            Download PDF
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Certificates;
