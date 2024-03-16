import React, { useMemo } from "react";
import { UsageGraph } from ".";
import { randomHexColors } from "../../utils";

export const WatchDog: React.FC = () => {
    const colorList:string[] = useMemo(() => randomHexColors(50), []);
    return (
        <div>
            <UsageGraph colors={colorList} filterAmount={10}/>
        </div>
    )
}