/**
 * FeatureToggleSwitch component
 * This component renders a toggle switch for enabling or disabling features.
 */

import { Switch } from "../components/ui/switch";

const FeatureToggleSwitch = ({
  feature,
  isEnabled,
  onToggle = () => {},
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      {feature.name}
      <Switch checked={feature.isActive} onCheckedChange={() => onToggle(feature.id, !feature.isActive)} />
    </div>
  );
};

export default FeatureToggleSwitch;
