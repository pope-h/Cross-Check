// src/pages/UserDashboard.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AssetList from '../components/AssetList';
import Notification from '../components/Notification';
import Modal from '../components/Modal';
import AssetForm from '../components/AssetForm';

interface UserDashboardProps {
  account: string;
  contract: any;
  setNotification: (notification: { message: string; type: 'error' | 'success' }) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ account, contract, setNotification }) => {
  const [assets, setAssets] = useState<Array<{ assetType: string; assetId: string; approvalStatus?: boolean }>>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
        closeModal(); // Close modal after successful submission
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

  const openModal = (formType: string) => {
    setActiveForm(formType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveForm(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto max-w-4xl mt-8 p-4 border-2 border-teal-900 bg-teal-800 rounded shadow-md">
      <h1 className="text-3xl font-bold text-center mb-4">User Dashboard</h1>

      {/* User Information */}
      <div className="mb-6 p-4 bg-teal-600 rounded">
        <h2 className="text-2xl font-semibold">Welcome, User!</h2>
        <p className="text-xl">Account: {account}</p>
      </div>

      {/* Asset List */}
      <AssetList assets={assets} onMint={handleMint} />

      {/* Dashboard Actions */}
      <div className="text-center mt-4">
        <button
          onClick={() => openModal('Certificate')}
          className="px-4 py-2 m-2 rounded bg-teal-600 text-white"
        >
          Add Certificate
        </button>
        <button
          onClick={() => openModal('Product')}
          className="px-4 py-2 m-2 rounded bg-teal-600 text-white"
        >
          Add Product
        </button>
        <button
          onClick={() => openModal('Land')}
          className="px-4 py-2 m-2 rounded bg-teal-600 text-white"
        >
          Add Land
        </button>
        <button
          onClick={() => openModal('Vehicle')}
          className="px-4 py-2 m-2 rounded bg-teal-600 text-white"
        >
          Add Vehicle
        </button>
        <Link to="/settings">
          <button className="px-4 py-2 m-2 rounded bg-teal-600 text-white">
            Settings
          </button>
        </Link>
      </div>

      {/* Modal Implementation */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {activeForm && (
          <div>
            <h2 className="font-semibold text-xl mb-4">Add New Asset - {activeForm}</h2>
            <AssetForm assetType={activeForm} onSubmit={handleAssetSubmit} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserDashboard;
