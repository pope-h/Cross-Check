import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import Notification from '../components/Notification';

const VerifyAsset: React.FC = () => {
  const { assetId } = useParams<{ assetId: string }>();
  const [tokenID, setTokenID] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [newOwnerAddress, setNewOwnerAddress] = useState<string>('');
  const [assetDetails, setAssetDetails] = useState<Record<string, string> | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  const fetchAssetDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/verify-asset?tokenID=${tokenID}&accessToken=${accessToken}`);
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

  const transferCustody = async () => {
    try {
      const response = await fetch('http://localhost:3001/transfer-custody', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenID, newOwnerAddress }),
      });
      const data = await response.json();
      if (data.success) {
        setNotification({ message: 'Custody transferred successfully', type: 'success' });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error transferring custody', error);
      setNotification({ message: 'Failed to transfer custody', type: 'error' });
    }
  };

  return (
    <div className="container mx-auto mt-16">
      <h1 className="text-3xl font-bold mb-8">Verify Asset</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Verify Asset</h2>
        <input
          type="text"
          value={tokenID}
          onChange={(e) => setTokenID(e.target.value)}
          placeholder="Enter Token ID"
          className="w-full p-2 mb-4 bg-gray-200 placeholder:text-teal-700 text-teal-700 rounded outline-none"
        />
        <input
          type="text"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
          placeholder="Enter Access Token"
          className="w-full p-2 mb-4 placeholder:text-teal-700 text-teal-700 bg-gray-200 rounded outline-none"
        />
        <Button onClick={fetchAssetDetails} className="w-full bg-teal-600 text-white">Verify Token</Button>
      </div>

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

      <div>
        <h2 className="text-xl font-semibold mb-4">Transfer Custody</h2>
        <input
          type="text"
          value={tokenID}
          onChange={(e) => setTokenID(e.target.value)}
          placeholder="Enter Token ID"
          className="w-full p-2 mb-4 bg-gray-200 placeholder:text-teal-700 text-teal-700 rounded outline-none"
        />
        <input
          type="text"
          value={newOwnerAddress}
          onChange={(e) => setNewOwnerAddress(e.target.value)}
          placeholder="Enter New Owner Address"
          className="w-full p-2 mb-4 bg-gray-200 placeholder:text-teal-700 text-teal-700 rounded outline-none"
        />
        <Button onClick={transferCustody} className="w-full bg-teal-600 text-white">Transfer</Button>
      </div>
    </div>
  );
};

export default VerifyAsset;
