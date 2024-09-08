"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import saveAs from "file-saver";

import { Share01Icon } from "../icons";
import { WordSet } from "@/hooks/useWordProgress";

const exportToCSV = (wordSet: WordSet) => {
  const csvData = [
    ...wordSet.words.map((word) => [
      word.originalWord,
      word.translatedWord,
    ]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `${wordSet.title}.txt`);
};

const ExportWords = ({ wordSet }: { wordSet: WordSet }) => {
  return (
    <Tooltip content="Export words">
      <Button isIconOnly onClick={() => exportToCSV(wordSet)}>
        <Share01Icon color="teal" className="dark:text-blue-300" />
      </Button>
    </Tooltip>
  );
};

export default ExportWords;
