import { createContext } from 'react'

export class Question {
  constructor(idx, desc, options, deleted, error) {
    this.idx = idx
    if (!desc) {
      this.desc = ""
    } else {
      this.desc = desc
    }
    if (!options) {
      this.options = []
    } else {
      this.options = options
    }
    if (!deleted) {
      this.deleted = false
    } else {
      this.deleted = true
    }
    if (!error) {
      this.error = ""
    } else {
      this.error = error
    }
  }

  submitVersion=() => {
    return {
      desc: this.desc,
      options: this.options.filter(option => !option.deleted).map(option => option.submitVersion())
    }
  }
}

export class Option {
  constructor(idx, desc, deleted, error) {
    this.idx = idx
    if (!desc) {
      this.desc = ""
    } else {
      this.desc = desc
    }
    if (!deleted) {
      this.deleted = false
    } else {
      this.deleted = true
    }
    if (!error) {
      this.error = ""
    } else {
      this.error = error
    }
  }

  submitVersion() {
    return this.desc
  }
}

export const QuestionContext = createContext({
  questions:[],
  generateEmptyQuestion: () => {},
  updateQuestion:  () => {},
  generateEmptyOption:  () => {},
  updateOption: () => {},
  validateQuestion: () => {},
  validateOption: () => {},
  validateAllOnSubmit: () => {},
})
