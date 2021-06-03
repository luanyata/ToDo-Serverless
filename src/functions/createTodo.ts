
import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuid} from 'uuid';
import { document } from '../utils/dynamodbClient';


interface IToDo {
  title: string;
  deadline: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as IToDo;

  await document
    .put({
      TableName: 'todos',
      Item: {
        id: uuid(),
        user_id,
        title,
        done: false,
        deadline,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'ToDo created!',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
