import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
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
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import { SearchRounded } from "@mui/icons-material";


function createData(OrganisationId, Name, Description) {
  return { OrganisationId, Name, Description };
}

const rows = [
  createData('ORG1001', 'Tech Innovators Inc.', 'A leading software development company specializing in AI solutions.'),
  createData('ORG1002', 'Green Future Foundation', 'A non-profit organization dedicated to promoting sustainable living.'),
  createData('ORG1003', 'Global Health Alliance', 'An international organization focused on improving healthcare accessibility.'),
  createData('ORG1004', 'NextGen Robotics', 'A robotics startup developing cutting-edge automation technologies.'),
  createData('ORG1005', 'EduConnect Solutions', 'An ed-tech company providing personalized learning platforms for students.'),
];


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "whitesmoke",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '40ch',
    // [theme.breakpoints.up('lg')]: {
    //   width: '20ch',
    // },
  },
}));

const Organisations = () => {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgDescription, setNewOrgDescription] = useState("");
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
    

  // Fetch Organisations
  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        // const response = await fetch("/api/organisations");
        // if (!response.ok) {
        //   throw new Error("Failed to fetch organisations.");
        // }
        // const data = await response.json();
        const data = {
          organisations: [
            {
              id: "ORG001",
              name: "Acme Corp",
              description: "Leading tech company",
            },
            {
              id: "ORG002",
              name: "Beta Ltd",
              description: "Innovative solutions provider",
            },
          ],
        };

        setOrganisations(data.organisations);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrganisations();
  }, []);

  // Create Organisation
  // const handleCreateOrganisation = async () => {
  //   try {
  //     //   const response = await fetch("/api/organisations", {
  //     //     method: "POST",
  //     //     headers: { "Content-Type": "application/json" },
  //     //     body: JSON.stringify({
  //     //       name: newOrgName,
  //     //       description: newOrgDescription,
  //     //     }),
  //     //   });

  //     //   if (!response.ok) {
  //     //     throw new Error("Failed to create organisation.");
  //     //   }

  //     //   const createdOrg = await response.json();

  //     const createdOrg = {
  //       id: "ORG003",
  //       name: newOrgName,
  //       description: newOrgDescription,
  //     };

  //     setOrganisations((prev) => [...prev, createdOrg]);
  //     setOpenCreateModal(false);
  //     setNewOrgName("");
  //     setNewOrgDescription("");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };


  const handleCreateOrganisation = ()=>{
    if(!newOrgName || !newOrgDescription){
      showAlert("error", "Please Enter All Fields");
    }
    else{
      const leng = rows.length+1
      rows.push(createData(`ORG100${leng}`,
        newOrgName,
        newOrgDescription,))
        setOpenCreateModal(false);
    }

  }
  // Open Organisation Detail Page
  const handleManageOrganisation = (orgId) => {
    navigate(`/organisation/detail/${orgId}`);
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
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <Box
          sx={{
            minHeight: "100vh",
            p: 4,
          }}
        >
          <Paper elevation={3} sx={{p:3}}>
          <Typography variant="h4" className="font-bold text-left pb-6 text-gray-700">
          Organisations
        </Typography>

      {/* Header Section */}
      <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 6,
              }}>
                <Stack component="form"  direction={'row'} justifyContent={'flex-start'} >
                <Search>
                    <SearchIconWrapper>
                    <SearchRounded  />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search' }}
                    // value={searchQuery}
                    // onChange={handleSearch}
                    />
                </Search>
                </Stack>
       
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreateModal(true)}
        >
         + Create
        </Button>
      </Box>

      {/* Organisations List */}
      {/* <section className="grid grid-cols-1 gap-6">
        {organisations.map((org) => (
          <Card key={org.id} className="shadow-md">
            <CardContent>
              <Grid2 container spacing={1}>
                <Grid2 size={{ sm: 12, md: 9 }}>
                  <Typography variant="h5" className="text-gray-700 mb-2">
                    {org.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500 mb-4">
                    {org.description}
                  </Typography>
                </Grid2>
                <Grid2 size={{ size: 12, md: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleManageOrganisation(org.id)}
                  >
                    Manage
                  </Button>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        ))}
      </section> */}

<TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ bgcolor: "text.primary" }}>
          <TableRow>
            <TableCell sx={{ color: 'white', fontWeight: "bold" }}>Organisation Id</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: "bold" }} align="left">Name</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: "bold" }} align="left">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.OrganisationId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.OrganisationId}
              </TableCell>
              <TableCell align="left">{row.Name}</TableCell>
              {row.Description &&
              <TableCell align="left" 
              
  

>
<Stack direction="row" alignItems="center" justifyContent={"space-between"}>
  <Typography  sx={{ 
    maxWidth: 500, 
    whiteSpace: "normal", 
    wordWrap: "break-word", 
    overflow: "hidden",
  }}>{row.Description}</Typography>

  <Button onClick={()=>handleManageOrganisation(row.OrganisationId)} variant="outlined">Manage</Button>
  </Stack>

  
</TableCell>}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

    </Paper>


      {/* Create Organisation Modal */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <DialogTitle>Create New Organisation</DialogTitle>
        <DialogContent>
          <TextField
            label="Organisation Name"
            fullWidth
            margin="dense"
            value={newOrgName}
            onChange={(e) => setNewOrgName(e.target.value)}
          />
          <TextField
            label="Organisation Description"
            fullWidth
            margin="dense"
            value={newOrgDescription}
            onChange={(e) => setNewOrgDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateModal(false)} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateOrganisation}
            color="primary"
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Organisations;
