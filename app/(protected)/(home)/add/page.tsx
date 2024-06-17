import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

import { CardComponent } from "@/components/ui/Card/Card";
import { getLanguages } from "@/lib/data/rest";
import { getFolders } from "@/lib/data/rest";


const Add = async () => {
  const languages = getLanguages();
  const folders = getFolders();

  const [lang, fold] = await Promise.all([languages, folders]);

  return (
    <div
      className="drop-shadow-lg border-none flex justify-center"
    >
      <CardComponent languages={lang} folders={fold} text="Create a new word set" />
    </div>
  );
};

export default Add;
