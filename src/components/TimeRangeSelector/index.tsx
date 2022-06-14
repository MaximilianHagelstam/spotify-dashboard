import { Dispatch, SetStateAction } from "react";
import TimeRange from "../../interfaces/TimeRange";
import classNames from "../../lib/classNames";

interface TimeRangeSelectorProps {
  currentTimeRange: TimeRange;
  handleTimeRange: Dispatch<SetStateAction<TimeRange>>;
}

const TimeRangeSelector = ({
  currentTimeRange,
  handleTimeRange,
}: TimeRangeSelectorProps) => {
  const selectedStyle =
    "bg-[#f6f6f6] text-black hover:bg-white hover:text-gray-background";
  const notSelectedStyle = "bg-[#232323] text-white hover:bg-[#2a2a2a]";
  const commonStyle =
    "py-2 px-4 text-sm rounded-full mb-8 leading-0 transition ease-in-out";

  return (
    <>
      <button
        onClick={() => handleTimeRange("short_term")}
        className={classNames(
          currentTimeRange === "short_term" ? selectedStyle : notSelectedStyle,
          commonStyle
        )}
      >
        Month
      </button>
      <button
        onClick={() => handleTimeRange("medium_term")}
        className={classNames(
          currentTimeRange === "medium_term" ? selectedStyle : notSelectedStyle,
          `${commonStyle} ml-4`
        )}
      >
        6 months
      </button>
      <button
        onClick={() => handleTimeRange("long_term")}
        className={classNames(
          currentTimeRange === "long_term" ? selectedStyle : notSelectedStyle,
          `${commonStyle} ml-4`
        )}
      >
        All time
      </button>
    </>
  );
};

export default TimeRangeSelector;
