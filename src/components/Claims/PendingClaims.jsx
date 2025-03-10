import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Stack,
  TablePagination,
} from "@mui/material";
import { getUserClaims } from "../../services/claimService";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";

const Claims = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { authInfo } = useAuth();
  const isLoggedIn = authInfo && authInfo.id_token;
  const { user_id } = authInfo || {};
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaims = async () => {
      if (!isLoggedIn || !user_id) return;
      try {
        const response = await getUserClaims(user_id);
        if (!response || response.status !== 200)
          throw new Error("Failed to fetch claims");
        setRows(response.data || []);
      } catch (error) {
        console.error(error);
        // showAlert("error", "Failed to fetch claims, please try again");
      }
    };
    fetchClaims();
  }, [isLoggedIn, user_id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((row) => row.change_status === "pending");

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 6 }}>
        <Table aria-label="simple table">
          <TableHead
            sx={{
              bgcolor: "rgb(224, 224, 224)",
              color: "rgb(76 78 100 / 87%)",
            }}
          >
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ClaimId</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Description
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.claim_id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                      "&.hover": { backgroundColor: "#afafaf !important" },
                    }}
                    onClick={() => {
                      navigate(`/claims/detail?claim_id=${row.claim_id}`);
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{color:"#8257dc"}}>
                      {row.claim_id}
                    </TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        maxWidth: 500,
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        overflow: "hidden",
                      }}
                    >
                      {row.description}
                    </TableCell>

                    <TableCell align="left">
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap={6}
                        justifyContent="flex-start"
                      >
                        {row.change_status === "approved" && (
                          <Chip
                            variant="outlined"
                            sx={{ width: 100 }}
                            color="success"
                            label="APPROVED"
                          />
                        )}
                        {row.change_status === "pending" && (
                          <Chip
                            variant="outlined"
                            sx={{ width: 100 }}
                            color="warning"
                            label="PENDING"
                          />
                        )}
                        {row.change_status === "rejected" && (
                          <Chip
                            variant="outlined"
                            sx={{ width: 100 }}
                            color="error"
                            label="REJECTED"
                          />
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No claims found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Claims;
