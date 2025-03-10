import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  styled,
  InputBase,
  TablePagination,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import { SearchRounded, West } from "@mui/icons-material";
import { getClaimDetails } from "../../services/claimService";
import {
  getResourceDetails,
  uploadResouceFile,
} from "../../services/documentService";
import { useDropzone } from "react-dropzone";

function createData(Name, Size, Type, Modified) {
  return { Name, Size, Type, Modified };
}

// const rows = [
//   createData('📜 Project_Report', '1.2 MB', 'PDF Document', '2024-02-01'),
//   createData('📊 Team_Presentation', '3.5 MB', 'PowerPoint Presentation', '2024-01-29'),
//   createData('📑 Budget_Sheet', '850 KB', ' Excel Spreadsheet', '2024-01-27'),
//   createData('🖼️ Company_Logo', '2.1 MB', 'Image File', '2024-01-25'),
//   createData('📝 Meeting_Notes', '500 KB', 'Word Document', '2024-01-23'),
//   createData('📜 Project_Report', '1.2 MB', 'PDF Document', '2024-02-01'),
//   createData('📊 Team_Presentation', '3.5 MB', 'PowerPoint Presentation', '2024-01-29'),
//   createData('📑 Budget_Sheet', '850 KB', ' Excel Spreadsheet', '2024-01-27'),
//   createData('🖼️ Company_Logo', '2.1 MB', 'Image File', '2024-01-25'),
//   createData('📝 Meeting_Notes', '500 KB', 'Word Document', '2024-01-24'),
// ];

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

const Resources = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const navigate = useNavigate();

  const [query] = useSearchParams();
  const id = query.get("claim_id");
  const [data, setData] = useState({});
  const [rows, setRows] = useState([]);
  const { showAlert } = useAlert();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isUploaded, setIsUploaded] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFileUploading, setIsFileUploading] = useState(false);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredRows(
      rows.filter((row) => {
        return row?.filename?.toLowerCase().includes(query);
      })
    );
  };

  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]); // Only store the first file
      console.log("Uploaded File:", acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Restrict to one file
  });

  useEffect(() => {
    const fetchClaimDetails = async () => {
      if (!id) return;
      try {
        const response = await getClaimDetails(id);
        setData(response.data);

        setLoading(false);
      } catch (e) {
        console.error(`error , Failed to get Claim Details`);
      }
    };
    fetchClaimDetails();
  }, [id, isUploaded]);

  useEffect(() => {
    const fetchResourceDetails = async () => {
      if (!id) return;
      try {
        const response = await getResourceDetails(id);
        setLoading(false);
        setRows(response?.data || []);
        setFilteredRows(response?.data || []);
      } catch (error) {
        console.error(`error , Failed to get Claim Details`);
      }
    };
    fetchResourceDetails();
  }, [id, isUploaded]);

  const handleUploadResourceFile = async () => {
    if (!file) {
      showAlert("error", "Please Upload Resource");
    } else {
      setIsFileUploading(true);
      try {
        await uploadResouceFile(id, file);
        setOpenCreateModal(false);
        setIsFileUploading(false);
        setIsUploaded(true);
      } catch (err) {
        console.error(`error : Failed to Upload Resource File`);
        showAlert("error", "Failed to Upload Resource File");
        setIsFileUploading(false);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  const TypeFunc = (name) => {
    const filetype = name.split(".");

    return <Typography>{filetype[1]}</Typography>;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
      }}
    >
      <Stack display={"felx"} flexDirection={"row"} mb={2}>
        <Button onClick={() => navigate(-1)} sx={{ border: 1 }}>
          <West />
        </Button>
      </Stack>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 6 }}>
        <Typography
          variant="h4"
          className="font-bold text-left pb-6 text-gray-700"
        >
          {data?.title}-Resources
        </Typography>

        {/* Header Section */}
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
          </Stack>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenCreateModal(true)}
          >
            Upload
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 6 }}>
          <Table aria-label="simple table">
            <TableHead
              sx={{
                bgcolor: "rgb(224, 224, 224)",
                color: "rgb(76 78 100 / 87%)",
              }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  Docement Id
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  Type
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  Modified
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.filename}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.document_id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.filename}
                      </TableCell>
                      <TableCell align="left">
                        {TypeFunc(row.filename)}
                      </TableCell>

                      <TableCell align="left">
                        {
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography>
                              {new Date().toLocaleDateString()}
                            </Typography>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                window.open(row.presigned_url, "_blank")
                              }
                            >
                              View File
                            </Button>
                          </Box>
                        }
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={createData.length} align="center">
                    No Resources found.
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
      </Paper>

      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <DialogTitle>Upload Resource</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isFileUploading ? (
            <CircularProgress />
          ) : (
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                borderRadius: "8px",
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <Typography>Drop the file here...</Typography>
              ) : (
                <Typography>
                  {file
                    ? `Selected File: ${file.name}`
                    : "Drag & drop a file here, or click to select one"}
                </Typography>
              )}
            </div>
          )}
        </DialogContent>
        {!isFileUploading && (
          <DialogActions>
            <Button
              onClick={() => setOpenCreateModal(false)}
              variant="outlined"
              color="primary"
              fullWidth
            >
              Cancel
            </Button>
            <Button
              onClick={handleUploadResourceFile}
              color="primary"
              variant="contained"
              fullWidth
            >
              Upload
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
};

export default Resources;
