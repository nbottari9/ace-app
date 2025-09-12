import { DMSans } from "@/app/fonts";
import { AbsoluteCenter } from "@chakra-ui/react/center";
import { ProgressCircle } from "@chakra-ui/react/progress-circle";

export const PointsGauge = ({ points }: { points: number }) => {
    return (
        /*this is probably bad*/
        < ProgressCircle.Root css={{ "--size": "200px" }
        } value={points} >
            <ProgressCircle.Circle strokeLinecap={"round"} css={{ "--size": "200px" }}>
                <ProgressCircle.Track css={{ "--size": "200px", "--thickness": "1em" }} />
                <ProgressCircle.Range css={{ "--size": "200px", "--thickness": "1em" }} />
            </ProgressCircle.Circle>
            <AbsoluteCenter>
                <div className={`${DMSans.className} text-6xl`}>
                    {points}
                </div>
            </AbsoluteCenter>
        </ProgressCircle.Root >
    )

};