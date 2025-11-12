import { ContainerTextFlip } from "@/components/container-text-flip";

export function ContainerTextFlipDemo() {
  return (
    <ContainerTextFlip
      words={[ "Meet the Engineer.","The Mind Behind the Machine.","Who is Rouabah Zine Eddine?"]}
      interval={3000}
      animationDuration={400}      />
  );
}
