export interface RecognitionAnalysis {
  source: Record<string, string>;
  expected: {
    coins: string | undefined;
    lap: string;
    laps: string;
    pause: boolean;
    shrooms: string;
    time: string | undefined;
    timeYellow: boolean;
    track: string;
  };
}
