// import { Pending } from "@mui/icons-material";

export const CLAIM_STATUSES = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

export const getIntialClaimRequest = () => ({
  title: "",
  description: "",
  status: CLAIM_STATUSES.pending,
});
