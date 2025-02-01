import TimeUtil from "../utils/TimeUtils";
import GreyPill from "./Pill";
import { Tooltip } from "@mui/material";
import SentimentVerySatisfiedSharpIcon from "@mui/icons-material/SentimentVerySatisfiedSharp";
import MoodBadSharpIcon from "@mui/icons-material/MoodBadSharp";
import SentimentVerySatisfiedTwoToneIcon from '@mui/icons-material/SentimentVerySatisfiedTwoTone';
import MoodBadTwoToneIcon from '@mui/icons-material/MoodBadTwoTone';

const REACTION_RELATE = 'Relate';
const REACTION_NOT_RELATE = 'Not Relate';

const ConfessionItem = ({ confession, handleRelate, handleNotRelate }) => {
  return (
    <>
      <div className="flex flex-col gap-1 px-3 py-6 my-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-gray-100 bg-white">
        <div className="text-lg font-bold">{confession.title}</div>
        <div className="flex flex-wrap text-sm">{confession.body}</div>
        <div className="flex flex-wrap flex-row gap-1 mt-2">
          {confession.tags.map((t, index) => (
            <GreyPill key={index} textData={t} />
          ))}
        </div>
        <div className="flex flex-row gap-2">
          <div className="w-fit flex flex-row justify-start gap-1">
            <Tooltip title="Relate" arrow placement="top" enterDelay={200}>
              <div
                onClick={() => handleRelate(confession.confessionId)}
                className="transition-all duration-300 hover:scale-125 cursor-pointer"
              >
                {confession.reaction === REACTION_RELATE ? <SentimentVerySatisfiedTwoToneIcon fontSize="medium" /> : 
                  <SentimentVerySatisfiedSharpIcon fontSize="medium" />}
              </div>
            </Tooltip>
            <div className="">{confession.relateCount}</div>
          </div>
          <div className="w-fit flex flex-row justify-start gap-1">
            <Tooltip title="Not Relate" arrow placement="top" enterDelay={200}>
              <div
              onClick={() => handleNotRelate(confession.confessionId)}
              className="transition-all duration-300 hover:scale-125 cursor-pointer">
                {confession.reaction === REACTION_NOT_RELATE ? <MoodBadTwoToneIcon fontSize="medium" /> : 
                  <MoodBadSharpIcon fontSize="medium" />}
              </div>
            </Tooltip>
            <div className="">{confession.notRelateCount}</div>
          </div>
        </div>
        <div className="flex flex-row justify-end text-sm font-semibold">
          {TimeUtil.findWhenPosted(confession.submittedOn)}
        </div>
      </div>
    </>
  );
};

export default ConfessionItem;
