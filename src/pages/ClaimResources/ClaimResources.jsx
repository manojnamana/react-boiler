import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Stack,
  IconButton,
  InputLabel,
  FormControl,
  styled,
  InputBase,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CLAIM_STATUSES, getIntialClaimRequest } from "../../utils/claims";
import {
  createNewClaim,
  getUserClaims,
  updateUserClaimsStatus,
} from "../../services/claimService";
import { useAlert } from "../../context/AlertContext";
import { Delete, Edit, Folder, SearchRounded } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "whitesmoke",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "40ch",
    // [theme.breakpoints.up('lg')]: {
    //   width: '20ch',
    // },
  },
}));

const ClaimResorces = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [createdNewClaim, setCreatedNewClaim] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClaimOpen, setIsModalClaimOpen] = useState(false);
  const [newClaim, setNewClaim] = useState(getIntialClaimRequest());
  const [selectedClaim, setSelectedClaim] = useState(null);
  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const isLoggedIn = authInfo && authInfo.id_token;
  const { user_id } = authInfo || {};
  const { showAlert } = useAlert();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredRows(
      rows.filter((row) => {
        return row?.title?.toLowerCase().includes(query);
      })
    );
  };

  // Fetch Claims
  useEffect(() => {
    const fetchClaims = async () => {
      if (!isLoggedIn || !user_id) return;
      try {
        const response = await getUserClaims(user_id);
        if (!response || response.status !== 200)
          throw new Error("Failed to fetch claims");
        setRows(response.data || []);
        setFilteredRows(response.data || []);
        // console.log(response.data)
      } catch (error) {
        console.error(error);
        // showAlert("error", "Failed to fetch claims, please try again");
      } finally {
        setLoading(false);
      }
    };
    fetchClaims();
  }, [isLoggedIn, user_id, createdNewClaim]);

  // Handle Form Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClaim({ ...newClaim, [name]: value });
  };

  const handleSubmit = async () => {
    if (!newClaim.title || !newClaim.description) {
      showAlert("error", "Please Enter All Fields");
    } else {
      try {
        const response = await createNewClaim(
          newClaim.title,
          newClaim.description,
          user_id
        );
        console.log(response);
        if (!response || response.status !== 201)
          throw new Error("Failed to create claim");
        const { data: createdClaim } = response;
        setRows([...rows, createdClaim]); // Add new claim to the list
        setFilteredRows([...filteredRows, createdClaim]);
        setIsModalOpen(false);
        setCreatedNewClaim(true);
        setNewClaim(getIntialClaimRequest()); // Reset form
      } catch (error) {
        console.error(error);
        showAlert("error", "Failed to create claim, please try again");
      }
    }
  };

  const handleSubmitClaim = async (claim_id) => {
    if (!selectedClaim?.status) {
      showAlert("error", "Please select a status");
      return;
    }

    try {
      await updateUserClaimsStatus(claim_id, selectedClaim.status);
      setCreatedNewClaim(true);
      showAlert("success", "Claim status updated successfully");
    } catch (error) {
      console.error(error);
      showAlert("error", "Failed to update claim status, please try again");
    } finally {
      setIsModalClaimOpen(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (!isLoggedIn || !user_id) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
        }}
      >
        <Typography variant="h4">Please login to view this page</Typography>
      </Box>
    );
  }

  const handleUpdateModelOpen = (claim_id, currentStatus) => {
    setSelectedClaim({ claim_id, status: currentStatus });
    setIsModalClaimOpen(true);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
      }}
    >
      <Paper elevation={3} sx={{ p: 3, borderRadius: 6 }}>
        <Typography
          variant="h4"
          className="font-bold text-left pb-6 text-gray-700"
        >
          Claim-Resources
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 6,
          }}
        >
          <Stack
            component="form"
            direction={"row"}
            justifyContent={"flex-start"}
          >
            <Search>
              <SearchIconWrapper>
                <SearchRounded />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearch}
              />
            </Search>
            <FormControl sx={{ minWidth: 150 }}>
              {/* <InputLabel id="filter-status-label">Filter by Status</InputLabel> */}
              <Select
                // labelId="filter-status-label"
                value={filterStatus}
                // label="Filter by Status"
                size="small"
                sx={{ textAlign: "center" }}
                onChange={(e) => {
                  const selectedStatus = e.target.value;
                  setFilterStatus(selectedStatus);

                  if (selectedStatus) {
                    setFilteredRows(
                      rows.filter((row) => row.change_status === selectedStatus)
                    );
                    console.log(selectedStatus);
                  } else {
                    setFilteredRows(rows); // Reset to show all rows when no filter is selected
                  }
                }}
                displayEmpty
                renderValue={(selected) =>
                  selected ? CLAIM_STATUSES[selected] : "Filter by Status"
                }
              >
                <MenuItem value="">All</MenuItem>
                {Object.keys(CLAIM_STATUSES).map((status) => (
                  <MenuItem key={status} value={status}>
                    {CLAIM_STATUSES[status]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
          >
            + New Claim
          </Button>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow
                          key={row.claim_id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
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
                              <IconButton
                                onClick={() =>
                                  handleUpdateModelOpen(
                                    row.claim_id,
                                    row.change_status
                                  )
                                }
                              >
                                <Edit />
                              </IconButton>
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  navigate(
                                    `/claimresources/detail?claim_id=${row.claim_id}`
                                  )
                                }
                                endIcon={<Folder />}
                              >
                                Resources
                              </Button>
                              <IconButton color="error">
                    <Delete/>
                  </IconButton>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No claims-resources found.
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
        )}
      </Paper>

      {/* Add New Claim Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Add New Claim</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 400,
            }}
          >
            <TextField
              label="Title"
              name="title"
              fullWidth
              sx={{ mt: 1 }}
              value={newClaim.title}
              onChange={handleChange}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={3}
              value={newClaim.description}
              onChange={handleChange}
            />
            {/* <FormControl >
            <InputLabel id="demo-simple-select-helper-label">Select Claim Status</InputLabel>
           <Select
  name="status"
  labelId="demo-simple-select-helper-label"
  label="Select Claim Status"
  fullWidth
  value={newClaim.status}
  onChange={handleChange}
  displayEmpty
  renderValue={(selected) => (selected ? CLAIM_STATUSES[selected] : "Select Claim Status")}
>
  <MenuItem value="" disabled>
   <em>Select Claim Status</em> 
  </MenuItem>
  {Object.keys(CLAIM_STATUSES).map((status) => (
    <MenuItem key={status} value={status}>
      {CLAIM_STATUSES[status]}
    </MenuItem>
  ))}
</Select>
</FormControl> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isModalClaimOpen}
        onClose={() => setIsModalClaimOpen(false)}
      >
        <DialogTitle>Update Claim Status</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 400,
            }}
          >
            <FormControl sx={{ mt: 1 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Select Claim Status
              </InputLabel>
              <Select
                name="status"
                labelId="demo-simple-select-helper-label"
                label="Select Claim Status"
                fullWidth
                value={selectedClaim?.status || ""}
                onChange={(e) =>
                  setSelectedClaim({ ...selectedClaim, status: e.target.value })
                }
                displayEmpty
                renderValue={(selected) =>
                  selected ? CLAIM_STATUSES[selected] : "Select Claim Status"
                }
              >
                <MenuItem value="" disabled>
                  <em>Select Claim Status</em>
                </MenuItem>
                {Object.keys(CLAIM_STATUSES).map((status) => (
                  <MenuItem key={status} value={status}>
                    {CLAIM_STATUSES[status]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalClaimOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmitClaim(selectedClaim.claim_id)}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClaimResorces;
