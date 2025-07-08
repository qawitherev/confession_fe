import { Badge } from "../components/ui/badge";

const GreyPill = ({ textData }) => {
  return (
      <Badge variant="secondary" className="text-xs">{textData}</Badge>
  );
};

export default GreyPill; 
