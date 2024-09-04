import React, { useState, useEffect } from 'react';
import AssetList from './AssetList';
import AssetForm from './AssetForm';
import Notification from './Notification';
import { div } from 'framer-motion/client';
import UserDashboard from '../pages/UserDashboard';

interface DashboardProps {
  account: string;
  contract: any;
  setNotification: (notification: { message: string; type: 'error' | 'success' }) => void;
}

const GetStarted: React.FC<DashboardProps> = ({ account, contract, setNotification }) => {
  const [assets, setAssets] = useState<Array<{ assetType: string; assetId: string; approvalStatus?: boolean }>>([]);
  const [activeForm, setActiveForm] = useState<string | null>(null);

  useEffect(() => {
    if (account) {
      fetchAssets(account);
    }
  }, [account]);

  const fetchAssets = async (address: string) => {
    try {
      const response = await fetch(`http://localhost:3001/assets?ownerAddress=${address}`);
      const data = await response.json();
      if (data.success) {
        setAssets(data.assets);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error fetching assets', error);
      setNotification({ message: 'Failed to fetch assets', type: 'error' });
    }
  };

  const handleAssetSubmit = async (assetData: { assetType: string; assetId: string; details: Record<string, string> }) => {
    try {
      const response = await fetch('http://localhost:3001/add-asset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...assetData, ownerAddress: account }),
      });
      const data = await response.json();
      if (data.success) {
        setNotification({ message: 'Asset submitted successfully', type: 'success' });
        fetchAssets(account);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error submitting asset', error);
      setNotification({ message: 'Failed to submit asset', type: 'error' });
    }
  };

  const handleMint = async (asset: { assetType: string; assetId: string }) => {
    try {
      const tx = await contract.mintAsset(asset.assetType, asset.assetId, 'ipfs://YOUR_IPFS_URI');
      await tx.wait();
      setNotification({ message: 'Asset minted successfully', type: 'success' });
      fetchAssets(account);
    } catch (error) {
      console.error('Error minting asset', error);
      setNotification({ message: 'Failed to mint asset', type: 'error' });
    }
  };

  return (
    <div>
      <UserDashboard account={''} contract={undefined} setNotification={function (notification: { message: string; type: 'error' | 'success'; }): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default GetStarted;
