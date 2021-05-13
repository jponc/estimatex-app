import React, { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { VotesMap } from "../types";

type Props = {
  votes: VotesMap;
};

export const VoteResults: React.FC<Props> = ({ votes }) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [avg, setAvg] = useState<number>(0);

  useEffect(() => {
    const voteNumbers: number[] = Object.values(votes).map(v => parseInt(v)).filter(v => v > 0);

    console.log(votes);
    console.log(voteNumbers);

    if (voteNumbers.length === 0) {
      return;
    }

    const min = Math.min(...voteNumbers);
    const max = Math.max(...voteNumbers);
    const sum = voteNumbers.reduce((a, b) => a + b, 0);
    const avg = parseFloat((sum / voteNumbers.length).toFixed(2));

    setMin(min);
    setMax(max);
    setAvg(avg);
  }, [votes]);


  return (
    <DataTable>
      <DataTable.Row>
        <DataTable.Cell>Min</DataTable.Cell>
        <DataTable.Cell numeric>{min}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Max</DataTable.Cell>
        <DataTable.Cell numeric>{max}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Average</DataTable.Cell>
        <DataTable.Cell numeric>{avg}</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};
