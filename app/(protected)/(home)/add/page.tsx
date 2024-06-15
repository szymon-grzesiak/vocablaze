import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

import { CardComponent } from "@/components/ui/Card/Card";

const Add = () => {
  return (
    <div
      className="drop-shadow-lg border-none flex justify-center"
    >
      <CardComponent text="Create a new word set" />
    </div>
  );
};

export default Add;
