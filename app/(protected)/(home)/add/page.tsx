import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

import { CardComponent } from "@/components/ui/Card/Card";
import { getLanguages } from "@/lib/data/rest";


const Add = async () => {
  const languages = await getLanguages();
  return (
    <div
      className="drop-shadow-lg border-none flex justify-center"
    >
      <CardComponent languages={languages} text="Create a new word set" />
    </div>
  );
};

export default Add;
