import React from "react";
import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const ResourcesListCard = ({ resources }) => {
  
  return (
    <Card className="mb-6 shadow-md">
      <CardContent>
        <Typography variant="h5" className="font-bold mb-4">
          Resource Documents
        </Typography>
        {resources.length === 0 ? (
          <Typography>No resources available for this claim.</Typography>
        ) : (
          <List>
            {resources.map((resource) => (
              <ListItem key={resource.doc_id} className="border-b">
                <ListItemText
                  primary={resource.filename}
                />
                <a
                  href={resource.presigned_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Download
                </a>
              </ListItem>
            ))}
          </List>
        )}
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={() => {}}
        >
          Add Document
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResourcesListCard;
