import React, { Dispatch, FC, ReactElement, useCallback, useRef } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { addTodo, IAddTodoAction } from "./actions";
import { v1 as UUIDV1 } from "uuid";
interface IProps {
  dispatch: Dispatch<IAddTodoAction>;
}

const Input: FC<IProps> = ({ dispatch }): ReactElement => {
  const input = useRef<HTMLInputElement>(null);

  const handleAddTodo = useCallback((): void => {
    const content = input!.current!.value;
    addTodo({ id: UUIDV1(), content, complete: false })(dispatch);
    input!.current!.value = "";
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} sm={3}>
        <TextField inputRef={input} label="TODO" sx={{flex : 1}} />
      </Grid>
      <Grid
        
        // container
        // item
        // xs={12}
        // sm={3}
        // alignItems="flex-end"
        // justify="flex-start"
      >
        <Button
          onClick={handleAddTodo}
        //   width="100px"
        //   variant="outlined"
        //   color="primary"
        >
          ADD
        </Button>
      </Grid>
    </Grid>
  );
};

export default Input;
