import { useNavigate, useParams } from "react-router-dom";
import { SeeAllButton } from "../common-styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { MembersList } from "./members-list";
import { MembersListExtended, MembersSummary } from "..";

export const MembersPanel = ({
  members,
  tokenSymbol,
  isExtended,
}: {
  members: any[];
  tokenSymbol: string;
  isExtended: boolean;
}) => {
  const navigate = useNavigate();
  const { daoAddress } = useParams();

  const hasMoreThanTwo = members.length > 3;

  return (
    <>
      <MembersSummary membersLength={members.length} />
      {isExtended ? (
        <MembersListExtended members={members} tokenSymbol={tokenSymbol} />
      ) : (
        <MembersList members={members} tokenSymbol={tokenSymbol} />
      )}
      {isExtended ? <div></div> : null}
      {hasMoreThanTwo && (
        <SeeAllButton
          onClick={() => {
            navigate(`/daos/${daoAddress}/members`);
          }}
        >
          See all{" "}
          <KeyboardArrowRightIcon width={10} sx={{ color: "#6666FF" }} />
        </SeeAllButton>
      )}
    </>
  );
};
