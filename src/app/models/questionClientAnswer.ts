export class QuestionClientAnswer {
  clientId: number;
  questionId: number;
  otv: string;


  constructor(clientId: number, questionId: number, otv: string) {
    this.clientId = clientId;
    this.questionId = questionId;
    this.otv = otv;
  }
}
