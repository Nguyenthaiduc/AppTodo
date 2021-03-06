import {
    Checkbox,
    ListItemIcon,
    ListItemText,
    ListItem as MaterialListItem,
  } from "@mui/material";
  import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
  import React, { FC, ReactElement } from "react";
  import { Todo, ID } from "../typing";
  
  interface ITodoListItem {
    todo: Todo;
    handleToggleTodoStatus: (id: ID) => () => void;
    handleRemoveTodo: (id: ID) => () => void;
  }
  
  const ListItem: FC<ITodoListItem> = ({
    todo: { id, content, complete },
    handleRemoveTodo,
    handleToggleTodoStatus,
  }: ITodoListItem): ReactElement => (
    <MaterialListItem divider button>
      <ListItemIcon>
        <Checkbox
          checked={complete}
          color="primary"
          onChange={handleToggleTodoStatus(id)}
        />
      </ListItemIcon>
      <ListItemText primary={content} />
      <ListItemIcon>
        <IndeterminateCheckBoxIcon onClick={handleRemoveTodo(id)} />
      </ListItemIcon>
    </MaterialListItem>
  );
  
  export default ListItem;
  