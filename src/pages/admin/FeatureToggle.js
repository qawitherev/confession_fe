/**
 * FeatureToggle.js
 * This file contains the FeatureToggle component, which allows users to enable or disable features in the application.
 * It includes a list of features with their current status and a toggle switch to change the status.
 */

import FeatureService from "../../services/featureService";
import FeatureToggleSwitch from "../../component/FeatureToggleSwitch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const FeatureToggle = () => {
  const [features, setFeatures] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const features = await FeatureService.getAllFeaturesStatus();
      if (!Array.isArray(features)) {
        const notArray = new Error("Response is not an array");
        throw notArray;
      }
      const data = features.map((feature) => ({
        id: feature.id,
        name: feature.name,
        isActive: feature.isActive === 1 ? true : false,
      }));
      setFeatures(data);
    } catch (err) {
      if (err.statusCode === 403) {
        navigate("/unauthorized");
      } else {
        toast.error("Something went wrong. Try again later");
        console.error(err.message);
      }
    }
  };

  const handleToggle = async (featureId, isActive) => {
    console.info(`Toggling feature with ID: ${featureId}`);
    const status = isActive ? "ACTIVE" : "INACTIVE";

    //optimistic update
    setFeatures((preFeatures) =>
      preFeatures.map((feature) =>
        feature.id === featureId ? { ...feature, isActive } : feature
      )
    );
    try {
      await FeatureService.updateFeatureStatus(featureId, status);
    } catch (err) {
      //something goes wrong, just return to previous state
      setFeatures((preFeatures) =>
        preFeatures.map((feature) =>
          feature.id === featureId
            ? { ...feature, isActive: !isActive }
            : feature
        )
      );
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col px-4 py-4">
      <h1 className="text-xl font-bold">Feature Toggle</h1>
      {features.map((feature, index) => (
        <FeatureToggleSwitch
          key={index}
          feature={feature}
          onToggle={handleToggle}
        />
      ))}
      <ToastContainer />
    </div>
  );
};

export default FeatureToggle;
