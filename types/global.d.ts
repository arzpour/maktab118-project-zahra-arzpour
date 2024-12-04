interface IChildren {
  children: React.ReactNode | JSX.Element | JSX.Element[];
}

interface IError {
  message: string;
  response: {
    statusText: string;
  };
  status: number;
}
