import React, { useState, useEffect } from 'react';
import AssetList from './AssetList';
import AssetForm from './AssetForm';
import Notification from './Notification';

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
    <div className="container mx-auto max-w-sm md:max-w-md lg:max-w-lg m-auto border-2 border-green-900 bg-green-800 p-2 rounded shadow-md">
      <h1 className="text-3xl font-bold text-center">Your Assets</h1>
      <AssetList assets={assets} onMint={handleMint} />

      {/* Buttons to select the asset form */}
      <div className="text-center mb-4">
        <button
          onClick={() => setActiveForm('Certificate')}
          className={`px-4 py-2 m-2 rounded ${activeForm === 'Certificate' ? 'bg-green-500 text-white' : 'bg-green-600'}`}
        >
          Certificate
        </button>
        <button
          onClick={() => setActiveForm('Product')}
          className={`px-4 py-2 m-2 rounded ${activeForm === 'Product' ? 'bg-green-500 text-white' : 'bg-green-600'}`}
        >
          Product
        </button>
        <button
          onClick={() => setActiveForm('Land')}
          className={`px-4 py-2 m-2 rounded ${activeForm === 'Land' ? 'bg-green-500 text-white' : 'bg-green-600'}`}
        >
          Land
        </button>
        <button
          onClick={() => setActiveForm('Vehicle')}
          className={`px-4 py-2 m-2 rounded ${activeForm === 'Vehicle' ? 'bg-green-500 text-white' : 'bg-green-600'}`}
        >
          Vehicle
        </button>
      </div>

      {/* Render the active asset form */}
      {activeForm && (
        <div>
          <h2 className="font-semibold text-xl mb-4">add new asset - {activeForm}</h2>
          {/* <AssetForm assetType={activeForm} onSubmit={handleAssetSubmit} /> */}
        </div>
      )}
    </div>
  );
};

export default GetStarted;
