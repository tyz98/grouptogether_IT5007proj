import {useContext} from 'react';
import { Box, Button, TextField } from '@mui/material';
import { makeStyles } from "@mui/styles"
import { QuestionContext, Question, Option } from '../context/QuestionContext'

//TODO: add delete question/option

export const QuestionEditorContainer = () => {
  const questionContext = useContext(QuestionContext)

  return (
    <>
      {
        questionContext.questions.map(question => <QuestionEditor key={question.idx} question={question}/>)
      }
      <Button variant="outlined" fullWidth onClick={questionContext.generateEmptyQuestion}>Add Question</Button>
    </>
  )
}

function QuestionEditor({question}) {
  const questionContext = useContext(QuestionContext)

  const useStyles = makeStyles(() => ({
    full: {
      width: "100%",
    }
  }));
  const classes = useStyles();

  if (question.deleted) {
    return <></>
  }

  return (
    <Box margin={1}>
      <TextField
        name={"Question" + question.idx}
        type="text"
        label="Question"
        value={question.desc}
        error={question.error.length > 0}
        helperText={question.error.length > 0 ? question.error : "Please enter the question"}
        className={classes.full}
        onChange={(e) => {
          questionContext.updateQuestion(new Question(question.idx, e.target.value, question.options, question.delete, question.error))
        }}
        onBlur={() => {questionContext.validateQuestion(question.idx)}}
      />
      {
        question.options.map(option => <OptionEditor key={option.idx} qidx={question.idx} option={option} />)
      }
      <br/>
      <Button size="small" onClick={() => {questionContext.generateEmptyOption(question.idx)}}>Add Option</Button>
    </Box>
  )
}

function OptionEditor({qidx, option}) {
  const questionContext = useContext(QuestionContext)

  const useStyles = makeStyles(() => ({
    option: {
      width: "60%",
    }
  }));
  const classes = useStyles();

  if (option.deleted) {
    return <></>
  }

  return (
    <TextField
      name={"Option" + option.idx}
      type="text"
      label="Option"
      value={option.desc}
      error={option.error.length > 0}
      helperText={option.error.length > 0 ? option.error : "Please enter the option"}
      className={classes.option}
      onChange={(e) => questionContext.updateOption(qidx, new Option(option.idx, e.target.value, option.deleted, option.error))}
      onBlur={() => {questionContext.validateOption(qidx, option.idx)}}
      variant="standard"
    />
  )
}