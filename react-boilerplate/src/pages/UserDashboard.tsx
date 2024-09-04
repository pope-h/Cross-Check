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
  const [assets, setAssets] = useState<Array<{ assetType: string; assetId: string; imageUrl?: string }>>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleAssetSubmit = async (assetData: { assetName: string; assetType: string; image: File }) => {
    try {
      const formData = new FormData();
      formData.append('ownerAddress', account);
      formData.append('assetName', assetData.assetName);
      formData.append('assetType', assetData.assetType);
      formData.append('image', assetData.image);

      const response = await fetch('http://localhost:3001/add-asset', {
        method: 'POST',
        body: formData,
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
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

      {/* Asset List or No Asset Message */}
      {assets.length === 0 ? (
        <div className="text-center p-4 bg-red-100 text-red-600 rounded">
          <p>No Asset Found, please create asset.</p>
          <button
            onClick={openModal}
            className="px-4 py-2 mt-4 rounded bg-teal-600 text-white"
          >
            Create Asset
          </button>
        </div>
      ) : (
        <AssetList assets={assets} onMint={() => {}} />
      )}

      {/* Modal Implementation */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="font-semibold text-xl mb-4">Create New Asset</h2>
        <AssetForm onSubmit={handleAssetSubmit} />
      </Modal>
    </div>
  );
};

export default UserDashboard;
