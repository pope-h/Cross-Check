import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import HowItWorks from "../components/HowItWorks";
import FeatureOverview from "../components/FeatureOverview";
import Modal from "../components/Modal";
import GetStarted from "../components/GetStarted";
import HeroImage from "../../public/hero-image.jpg";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import AssetForm from "../components/AssetForm";
import AssetDetails from "../components/AssetDetails"; // Import AssetDetails for showing verified asset details
import VerifyAsset from "./VerifyAsset";

const LandingPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyTokenId, setVerifyTokenId] = useState<string>("");
  const [verifiedAsset, setVerifiedAsset] = useState<null | {
    assetName: string;
    assetType: string;
    description: string;
    imageUrl: string;
  }>(null);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openVerifyModal = () => setIsVerifyModalOpen(true);
  const closeVerifyModal = () => {
    setIsVerifyModalOpen(false);
    setVerifyTokenId("");
    setVerifiedAsset(null);
  };

  function handleAssetSubmit(assetData: { assetName: string; assetType: string; image: File; }): void {
    // Implementation for creating asset
    console.log(assetData);
  }

  const handleVerifyAsset = async () => {
    try {
      const response = await fetch(`http://localhost:3001/verify-asset?tokenId=${verifyTokenId}`);
      const data = await response.json();
      if (data.success) {
        setVerifiedAsset(data.asset);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error verifying asset", error);
    }
  };

  return (
    <div className="text-center">
      <div className="bg-background container mb-28 pt-16 mx-auto flex items-center justify-between">
        <div className="mx-10">
          <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-12">
            <div className="space-y-6 text-start col-span-3">
              <h1 className="text-6xl font-extrabold tracking-tight lg:text-7xlt text-foreground">
                Authenticate and Trace Asset Ownership with Blockchain Technology
              </h1>
              <p className="text-xl text-muted-foreground">
                Building trust and transparency across industries through immutable digital verification.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={openCreateModal}
                  className="flex items-center rounded-full border border-white p-5 bg-teal-500 hover:border-teal-800 hover:text-teal-800 hover:bg-white"
                >
                  Create Asset
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={openVerifyModal}
                  className="flex items-center px-8 rounded-full hover:border-white hover:bg-teal-500 hover:text-white border-teal-900 p-5 bg-white text-teal-800"
                >
                  Verify Asset
                </button>
              </div>
            </div>
            <div className="col-span-2">
              <img
                src={HeroImage}
                alt="Graduate with blockchain certificate"
                className="relative w-full z-10 rounded-lg shadow-xl"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </div>
      <HowItWorks />
      <FeatureOverview />

      {/* Create Asset Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal}>
        <h2 className="font-semibold text-xl mb-4">Create New Asset</h2>
        <AssetForm onSubmit={handleAssetSubmit} />
      </Modal>

      {/* Verify Asset Modal */}
      <Modal isOpen={isVerifyModalOpen} onClose={closeVerifyModal}>
        <VerifyAsset />
        {verifiedAsset && (
          <div>
            <AssetDetails selectedAsset={verifiedAsset} />
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
};

export default LandingPage;
