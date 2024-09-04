import React, { useState } from "react";
import { getContract } from "../utils/ethers";

const ManufacturerDashboard = () => {
  const [formData, setFormData] = useState({
    productId: "",
    origin: "",
    manufacturer: "",
    batchNumber: "",
    tokenURI: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mintStamp = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.mintStamp(
        formData.productId,
        formData.origin,
        formData.manufacturer,
        formData.batchNumber,
        formData.tokenURI
      );
      await tx.wait();
      alert("Digital Stamp minted successfully!");
    } catch (error) {
      console.error("Error minting stamp:", error);
      alert("Error minting stamp. See console for details.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manufacturer Dashboard</h2>
      <div className="space-y-4">
        <input
          name="productId"
          value={formData.productId}
          onChange={handleInputChange}
          placeholder="Product ID"
          className="input-field"
        />
        <input
          name="origin"
          value={formData.origin}
          onChange={handleInputChange}
          placeholder="Origin"
          className="input-field"
        />
        <input
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleInputChange}
          placeholder="Manufacturer"
          className="input-field"
        />
        <input
          name="batchNumber"
          value={formData.batchNumber}
          onChange={handleInputChange}
          placeholder="Batch Number"
          className="input-field"
        />
        <input
          name="tokenURI"
          value={formData.tokenURI}
          onChange={handleInputChange}
          placeholder="Token URI"
          className="input-field"
        />
        <button
          onClick={mintStamp}
          className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
        >
          Mint Digital Stamp
        </button>
      </div>
    </div>
  );
};

export default ManufacturerDashboard;