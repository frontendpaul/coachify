import StatisticCard from './StatisticCard';

const Statistics = () => {
  return (
    <div className="px-4 md:px-6 py-16 md:py-32">
      <h2 className="sr-only">Statistics</h2>
      <div
        className="grid grid-cols-2 gap-4 md:gap-6 max-w-lg mx-auto 
        xl:grid-cols-none xl:grid-flow-col xl:auto-cols-max xl:justify-center xl:max-w-max"
      >
        <StatisticCard statistic={'1600+'} title="Memebrs" />
        <StatisticCard statistic={'65+'} title="Teachers" />
        <StatisticCard statistic={'210+'} title="Classes" />
        <StatisticCard statistic={'4.8'} title="Avg. Class Rating" isRating />
      </div>
    </div>
  );
};
export default Statistics;
