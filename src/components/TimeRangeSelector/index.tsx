import { Dispatch, SetStateAction } from "react";
import TimeRange from "../../interfaces/TimeRange";
import { classNames } from "../../lib/helpers";

interface TimeRangeSelectorProps {
  currentTimeRange: TimeRange;
  handleTimeRange: Dispatch<SetStateAction<TimeRange>>;
}

const TimeRangeSelector = ({
  currentTimeRange,
  handleTimeRange,
}: TimeRangeSelectorProps) => {
  return (
    <>
      <button
        onClick={() => handleTimeRange("short_term")}
        className={classNames(
          currentTimeRange === "short_term"
            ? "bg-white text-black"
            : "text-white",
          "border-white border-2 font-bold py-2 px-6 rounded-full mb-8 hover:bg-white hover:text-black"
        )}
      >
        Short
      </button>
      <button
        onClick={() => handleTimeRange("medium_term")}
        className={classNames(
          currentTimeRange === "medium_term"
            ? "bg-white text-black"
            : "text-white",
          "border-white border-2 font-bold py-2 px-6 rounded-full mb-8 hover:bg-white hover:text-black ml-4"
        )}
      >
        Medium
      </button>
      <button
        onClick={() => handleTimeRange("long_term")}
        className={classNames(
          currentTimeRange === "long_term"
            ? "bg-white text-black"
            : "text-white",
          "border-white border-2 font-bold py-2 px-6 rounded-full mb-8 hover:bg-white hover:text-black ml-4"
        )}
      >
        Long
      </button>

      <span className="text-gray-text text-lg flex justify-center mb-4 md:ml-8 md:mb-0 md:inline">
        {currentTimeRange === "short_term"
          ? "Last 4 weeks"
          : currentTimeRange === "medium_term"
          ? "Last 6 months"
          : currentTimeRange === "long_term"
          ? "Last several years"
          : ""}
      </span>
    </>
  );
};

export default TimeRangeSelector;
