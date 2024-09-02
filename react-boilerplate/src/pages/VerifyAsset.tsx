import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import Notification from '../components/Notification';

const VerifyAsset: React.FC = () => {
  const { assetId } = useParams<{ assetId: string }>();
  const [assetDetails, setAssetDetails] = useState<Record<string, string> | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  const fetchAssetDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/verify-asset?assetId=${assetId}`);
      const data = await response.json();
      if (data.success) {
        setAssetDetails(data.details);
        setNotification(null);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error fetching asset details', error);
      setNotification({ message: 'Failed to fetch asset details', type: 'error' });
    }
  };

  return (
    <div className="container mx-auto mt-16">
      <h1 className="text-3xl font-bold mb-8">Verify Asset</h1>
      <Button onClick={fetchAssetDetails} className="mb-8">Fetch Asset Details</Button>
      {notification && <Notification message={notification.message} type={notification.type} />}
      {assetDetails && (
        <Card>
          <CardHeader title={`Asset ID: ${assetId}`} />
          <CardContent>
            {Object.entries(assetDetails).map(([key, value], index) => (
              <p key={index}><strong>{key}:</strong> {value}</p>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VerifyAsset;