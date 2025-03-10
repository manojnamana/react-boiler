import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Box,
  styled,
  InputBase,
  TablePagination,
} from "@mui/material";
import { Business, SearchRounded } from "@mui/icons-material";
import { useAlert } from "../../context/AlertContext";
import { useNavigate } from "react-router-dom";
import { AddUsers, createOrganisation, getUserOrganisation } from "../../services/organisationsService";
import { useAuth } from "../../context/AuthContext";

function createData(UserId, Name, Email) {
  return { UserId, Name, Email };
}

// const rows = [
//   createData('USER1001', 'Alice Johnson', 'alice.johnson@example.com'),
//   createData('USER1002', 'Robert Smith', 'robert.smith@example.com'),
//   createData('USER1003', 'Sophia Martinez', 'sophia.martinez@example.com'),
//   createData('USER1004', 'James Anderson', 'james.anderson@example.com'),
//   createData('USER1005', 'Emily Davis', 'emily.davis@example.com'),
// ];

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
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [data,setData] = useState({})
  const [loading, setLoading] = useState(true);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newOrgName,setNewOrgName] = useState(null)
  const [newOrgDescription,setNewOrgDescription] = useState(null)
  const [newOrgAddress,setNewOrgAddress] = useState(null) 
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { authInfo } = useAuth();
  const { user_id } = authInfo || {};
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [cardTrue,setCardTrue,] = useState(false)
  const [filteredRows,setFilteredRows] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [addUserTrue,setAddUserTrue] = useState(false)

  const handleSearch = (event) => {

    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  
    setFilteredRows(
      rows.filter((row) => {
        
        return (
          row?.name?.toLowerCase().includes(query)
         
        );
      })
    );
  };

  // Fetch Organisation Details
  useEffect(() => {
    const fetchOrganisationss = async () => {
      try {
        const response = await getUserOrganisation(user_id)
        
        if(response === 'User is not assigned to any organization.'){
          console.log("get")
          setOpenCreateModal(true)
        }
        if (response.status === 200){
          console.log(response.data)
          setData(response?.data)
          setRows(response?.data?.users)
          setFilteredRows(response?.data?.users ||[])
          setCardTrue(true)
        }
        
      } catch (err) {
        console.error(`error : ${err}`)
        setLoading(false);
      }
      finally{
        setLoading(false)
      }

    };

    fetchOrganisationss();
  }, [user_id,cardTrue,addUserTrue]);


  const handleAddUser = async()=>{
    if(!newUserId ){
      showAlert("error", "Please Enter UserId");
    }
    else{
      try{
        const response = await AddUsers(newUserId,data?.id)
        
        if(response.status === 404){
          showAlert("error",`User Not Found`)
          
        }
        if(response.status === 200) {
          setAddUserTrue(true)
          showAlert("success",`User added successfully`)
          console.log(response.data)
          
        }
      }catch(err){
 
        console.error("error : Failed to Add User")
        
      }finally{
        setOpenAddUserModal(false)
      }
      
      
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateOrganisiation =async ()=>{
    if(!newOrgAddress || !newOrgDescription || !newOrgName){
      showAlert("error", "Please Enter All Fileds");
    }
    else{
      try{
        const response =await createOrganisation(newOrgName,user_id,newOrgAddress,newOrgDescription)
       
        if(response.status === 201){
          console.log(response.data)
          setCardTrue(true)
          setOpenCreateModal(false)
        }
        


      }catch(err){
        console.error("Error : Failed to create Organisiation")
        showAlert("error", "Failed to create Organisiation");
      }
    }
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
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
          
         { cardTrue ?
          (<Paper elevation={3} sx={{p:3,borderRadius:6}}>
            <Box>
          <Typography variant="h4" className="text-gray-700 pb-1 mb-1">
          {data?.name} 
          </Typography>
          <Typography variant="h6"  fontWeight={"bold"} className="text-violet-500">#{data?.id}</Typography>
          
          <Typography variant="body1" className="text-slate-400 pb-6 mb-2">
          {data?.description}
          </Typography>
          </Box>


          

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
                    value={searchQuery}
                    onChange={handleSearch}
                    />
                </Search>
                </Stack>
       
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddUserModal(true)}
        >
         + Add User
        </Button>
      </Box>

<TableContainer component={Paper} sx={{borderRadius:6}}>
      <Table aria-label="simple table">
        <TableHead sx={{ bgcolor: "rgb(224, 224, 224)",color:"rgb(76 78 100 / 87%)" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>User Id</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.length >0 ? (
          filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.user_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.user_id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              {row.email && (<TableCell align="left">
                <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
                {row.email}
                <Button variant="outlined" onClick={()=>navigate(`/organisation/claims?user_id=${row.user_id}`)}>Claims</Button>
                </Stack>
                
                
                </TableCell>)}
            </TableRow>
          ))):(
            <TableRow>
                                        <TableCell colSpan={createData.length} align="center">
                                          No users found.
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
          </Paper>) :
          (

            <Stack display={"flex"} 
            justifyContent={"center"}
            flexDirection={"row"}
            height={"100vh"}
             alignItems={"center"}>

              <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Business style={{fontSize:200}}/>
              <Typography>No Orgainsations Found</Typography>
              <Button variant="contained" sx={{mt:2}} onClick={()=>setOpenCreateModal(true)}>Create Orginsation</Button>
              </Stack>

              

            </Stack>
            

          )
}
    <Dialog
        open={openAddUserModal}
        onClose={() => setOpenAddUserModal(false)}
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="User id"
            fullWidth
            margin="dense"
            value={newUserId}
            onChange={(e) => setNewUserId(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddUserModal(false)} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary" variant="contained">
            Add User
          </Button>
        </DialogActions>
      </Dialog>

            <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
              <DialogTitle>Create Organisation</DialogTitle>
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
                <TextField
                  label="Organisation Address"
                  fullWidth
                  margin="dense"
                  value={newOrgAddress}
                  onChange={(e) => setNewOrgAddress(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenCreateModal(false)} variant="outlined" color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateOrganisiation}
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
