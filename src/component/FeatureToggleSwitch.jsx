/**
 * FeatureToggleSwitch component
 * This component renders a toggle switch for enabling or disabling features.
 */

import { Switch } from "../components/ui/switch";

const FeatureToggleSwitch = ({ featureName, isEnabled, onToggle }) => {
    return (
        <Switch />
    );
}

export default FeatureToggleSwitch;