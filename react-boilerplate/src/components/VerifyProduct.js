import React, { useState } from "react";
import { getContract } from "../utils/ethers";

const VerifyProduct = () => {
  const [tokenId, setTokenId] = useState("");
  const [productData, setProductData] = useState(null);

  const verifyProduct = async () => {
    try {
      const contract = await getContract();
      const data = await contract.verifyStamp(tokenId);
      setProductData(data);
    } catch (error) {
      console.error("Error verifying product:", error);
      alert("Product not found. See console for details.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Verify Product</h2>
      <div className="space-y-4">
        <input
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="Token ID"
          className="input-field"
        />
        <button
          onClick={verifyProduct}
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
        >
          Verify Product
        </button>
      </div>
      {productData && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
          <h3 className="font-bold text-lg">Product Details:</h3>
          <p>
            <strong>Product ID:</strong> {productData.productId}
          </p>
          <p>
            <strong>Origin:</strong> {productData.origin}
          </p>
          <p>
            <strong>Manufacturer:</strong> {productData.manufacturer}
          </p>
          <p>
            <strong>Batch Number:</strong> {productData.batchNumber}
          </p>
          <p>
            <strong>Timestamp:</strong>{" "}
            {new Date(productData.timestamp * 1000).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyProduct;