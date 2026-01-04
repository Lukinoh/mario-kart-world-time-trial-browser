export interface RecognitionAnalysis {
  source: Record<string, string>;
  expected: {
    coins: string;
    lap: string;
    laps: string;
    pause: boolean;
    shrooms: string;
    time: string;
    timeYellow: boolean;
    track: string;
  };
}
