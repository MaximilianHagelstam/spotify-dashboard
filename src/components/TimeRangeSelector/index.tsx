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
  const selectedStyle = "bg-white text-black hover:bg-white hover:text-black";
  const notSelectedStyle = "text-white hover:bg-[#333333]";
  const commonStyle =
    "border-white border-2 font-bold py-2 px-4 text-sm rounded-full mb-8";

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
