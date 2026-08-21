import CountUpModule from 'react-countup';

const ReactCountUp = CountUpModule.default || CountUpModule;

export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 5000,
}) {
  const numericValue = parseFloat(value) || 0;

  return (
    <ReactCountUp
      end={numericValue}
      duration={duration / 1000}
      decimals={decimals}
      prefix={prefix}
      suffix={suffix}
      enableScrollSpy={true}
      scrollSpyOnce={true}
      useEasing={true}
      className="inline-block"
    />
  );
}