import TextPressure from '@/components/ui/pressure-text';

const TextPressureDemo = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-10">
      <div className="relative flex flex-col items-center justify-center space-y-2 sm:space-y-3">
        <TextPressure
          text="ZINE EDDINE"
          flex={false}
          alpha={false}
          stroke={false}
          width={false}
          weight={true}
          italic={true}
          textColor="currentColor"
          minFontSize={54}
          className="text-foreground"
        />
        <TextPressure
          text="ROUABAH"
          flex={false}
          alpha={false}
          stroke={false}
          width={false}
          weight={true}
          italic={true}
          textColor="currentColor"
          minFontSize={64}
          className="text-foreground"
        />
      </div>
    </div>
  );
};

export default TextPressureDemo;
