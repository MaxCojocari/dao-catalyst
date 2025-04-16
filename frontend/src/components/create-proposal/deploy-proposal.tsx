import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import { CheckBox } from "../common-styles";

interface DeployProposalProps {
  confirmed: boolean;
  setConfirmed: (v: any) => void;
  //   setStep: (v: any) => void;
}

export const DeployProposal = ({
  confirmed,
  setConfirmed,
}: DeployProposalProps) => {
  return (
    <div>
      {" "}
      <CheckBox>
        {confirmed ? (
          <CheckBoxRoundedIcon
            sx={{ color: "#6c63ff", fontSize: 20, cursor: "pointer" }}
            onClick={() => setConfirmed(!confirmed)}
          />
        ) : (
          <CheckBoxOutlineBlankRoundedIcon
            sx={{ color: "#E6E6FF", fontSize: 20, cursor: "pointer" }}
            onClick={() => setConfirmed(!confirmed)}
          />
        )}
        <p>I confirm these values are correct.</p>
      </CheckBox>
    </div>
  );
};
