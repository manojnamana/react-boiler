import { Send, West } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useCallback, useEffect, useState } from "react";
import pdfIcon from "../../assets/icons/pdf.png";
import pptIcon from "../../assets/icons/ppt.png";
import xlsxIcon from "../../assets/icons/xlsx.png";
import docxIcon from "../../assets/icons/docx.png";
import jpgIcon from "../../assets/icons/jpg-file.png";
import txtIcon from "../../assets/icons/txt.png";
import pngIcon from "../../assets/icons/png-file-.png";
import jpegIcon from "../../assets/icons/jpeg.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getClaimDetails,
  postClaimFeedBack,
} from "../../services/claimService";
import ChatSection from "../../components/Chat/ChatSection";
import {
  getResourceDetails,
  uploadResouceFile,
} from "../../services/documentService";
import { useAlert } from "../../context/AlertContext";
import { useDropzone } from "react-dropzone";

function ClaimDetail() {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const id = query.get("claim_id");
  const [data, setData] = useState({});
  const [rows, setRows] = useState([]);
  const [feedBack, setFeedBack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("1");
  const { showAlert } = useAlert();
  const [file, setFile] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [isFileUploadLoading, setIsFileUploadLoading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      } catch (e) {
        console.error(`error , Failed to get Claim Details`);
      }
    };
    fetchClaimDetails();
  }, [id]);

  useEffect(() => {
    const fetchResourceDetails = async () => {
      if (!id) return;
      try {
        const response = await getResourceDetails(id);
        setLoading(false);
        setRows(response?.data || []);
      } catch (error) {
        console.error(`error , Failed to get Claim Details`);
      }
    };
    fetchResourceDetails();
  }, [id, isFileUploaded]);

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

  const TypeFunc = (name) => {
    const filetype = name.split(".");
    // TODO: Fetch file size and display it
    return <Typography>20MB.{filetype[1]}</Typography>;
  };
  const ImageFunc = (name) => {
    const filetype = name.split(".").pop().toLowerCase(); // Get file extension safely

    const icons = {
      docx: docxIcon,
      pdf: pdfIcon,
      xlsx: xlsxIcon,
      pptx: pptIcon,
      txt: txtIcon,
      jpg: jpegIcon,
      jpeg: jpgIcon,
      png: pngIcon,
    };

    return (
      <img
        src={icons[filetype]} // Use file-specific icon or a default icon
        alt={filetype || "File"}
        className="w-10 h-10 mr-3 text-center"
      />
    );
  };

  const handleSubmitFeedBack = async () => {
    try {
      const response = await postClaimFeedBack(id, feedBack);
      if (response.status === 200) {
        showAlert("success", "Feedback Submited");
        setFeedBack(null);
      }
    } catch (err) {
      console.error("Error : failed to submit Feedback");
    }
  };
  const handleUploadResourceFile = async () => {
    if (!file) {
      showAlert("error", "Please Upload Resource");
    } else {
      setIsFileUploadLoading(true);
      try {
        await uploadResouceFile(id, file);
        setOpenCreateModal(false);
        setIsFileUploadLoading(false);
        setIsFileUploaded(true);
      } catch (err) {
        console.error(`error : Failed to Upload Resource File`);
        showAlert("error", "Failed to Upload Resource File");
        setIsFileUploadLoading(false);
      }
    }
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
        <Stack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack>
            <Typography variant="h4" className="text-gray-700 pb-1 mb-1">
              {data?.title}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              className="text-violet-500"
            >
              #{data?.claim_id}
            </Typography>

            <Typography variant="body2" className="text-slate-400 pb-6 mb-2">
              {data?.description}
            </Typography>
          </Stack>
          <Stack>
            <Button
              variant="contained"
              onClick={() => setOpenCreateModal(true)}
            >
              Upload
            </Button>
          </Stack>
        </Stack>

        <Grid container>
          <Paper elevation={3} sx={{ display: "flex", width: "100%" }}>
            <>
              <ChatSection
                url={data.chat_history_url}
                claimId={data.claim_id}
              />
            </>

            <Grid item xs={12} md={4}>
              <Stack borderLeft={1} borderColor={"lightgray"}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Resources" value="1" />
                      <Tab label="Feed Back" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1" sx={{ p: 0 }}>
                    <Stack
                      sx={{
                        height: 398,
                        overflowY: "scroll",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" },
                      }}
                    >
                      {rows.map((i) => (
                        <Stack
                          key={i.filename} // Ensure each element has a unique key
                          sx={{
                            p: 1,
                            borderBottom: 1,
                            borderColor: "lightgray",
                          }}
                        >
                          <Grid container>
                            <Grid item xs={8}>
                              <Stack
                                display={"flex"}
                                flexDirection={"row"}
                                alignItems={"center"}
                              >
                                <Box>{ImageFunc(i.filename)}</Box>

                                <Box>
                                  <Typography>{i.filename}</Typography>
                                  <Box
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                  >
                                    {TypeFunc(i.filename)}
                                  </Box>
                                </Box>
                              </Stack>
                            </Grid>
                            <Grid item xs={4}>
                              <Box textAlign={"end"}>
                                <Typography>⠀</Typography>
                                {/* TODO: Change this hardcoding value later */}
                                <Typography>
                                  {new Date().toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Stack>
                      ))}
                    </Stack>
                  </TabPanel>
                  <TabPanel value="2" sx={{ p: 0 }}>
                    <Stack
                      sx={{
                        height: 400,
                        overflowY: "scroll",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" },
                      }}
                    >
                      <FormControl variant="outlined">
                        <Input
                          id="input-with-icon-adornment"
                          fullWidth
                          multiline
                          value={feedBack}
                          rows={2}
                          onChange={(e) => setFeedBack(e.target.value)}
                          placeholder="Write your feedback..."
                          sx={{ p: 0.6 }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                disabled={!feedBack}
                                onClick={handleSubmitFeedBack}
                              >
                                <Send />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Stack>
                  </TabPanel>
                </TabContext>
              </Stack>
            </Grid>
          </Paper>
        </Grid>
      </Paper>
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <DialogTitle>Upload Resource</DialogTitle>
        <DialogContent>
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
            {isFileUploadLoading ? (
              <CircularProgress />
            ) : (
              <>
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
              </>
            )}
          </div>
        </DialogContent>
        {!isFileUploadLoading && (
          <DialogActions>
            <Button
              onClick={() => setOpenCreateModal(false)}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUploadResourceFile}
              color="primary"
              variant="contained"
            >
              Upload
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
}

export default ClaimDetail;
