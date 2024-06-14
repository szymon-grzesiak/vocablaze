import React from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";


const Add = () => {
  return (
    <Card
    isBlurred
    className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
    shadow="sm"
  >
      <div className="bg-white rounded-lg w-[300px] h-[300px]">Card1</div>
      <div className="bg-white rounded-lg w-[300px] h-[300px]">Card2</div>
    </Card>
  );
};

export default Add;
