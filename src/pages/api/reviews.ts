/* eslint-disable import/no-anonymous-default-export */
// Not actually used during tests as the requests to this route are mocked
export default (_req: any, res: any) => {
  res.status(200).json([
    {
      id: '10333292-7ca1-4361-bf38-b6b43b90cb11',
      title: 'Charmander',
      description: 'fire pokemon',
    },
  ]);
};
