import React, { FC } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background: #fafafa;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
`;

const Button = styled.button`
  background: #fff;
  border: 0;
  width: 100px;
  padding: 10px 0;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.1s linear;
  cursor: pointer;

  &:focus, &:active {
    outline: none;
  }

  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
                0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  &:active {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
                0 1px 3px rgba(0, 0, 0, 0.08);
    background-color: #f6f9fc;
    transform: translateY(1px);
  }

  &:disabled {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
                0 1px 3px rgba(0, 0, 0, 0.08);
    background-color: #f6f9fc;
    transform: none;
    cursor: progress;
    &:focus,
    &:active,
    &:hover {
      transform: none;
    }
  }
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #666;
`;

const Card = styled.div`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
  background: #fff;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  & + & {
    margin-top: 30px;
  }
`;

const SendTxForm = styled.form`
  display: flex;
  margin: 0;
  padding-top: 20px;

  * + * {
    margin-left: 10px;
  }
`;

const Submit = styled(Button)`
  border: 2px solid #bbb;
  box-shadow: none;

  &:hover{
      box-shadow:none;
      transform:none;
  }

  &:disabled{
    color:#999;
    border: 2px solid #999;
    cursor:not-allowed;
    box-shadow:none;
  }
`;

const Input = styled(Submit)`
  width: 200px;
  padding-left: 10px;
  color: ${props => ((props as any).hasError && 'tomato')};
  border-color: ${props => ((props as any).hasError && 'tomato')};
  cursor: text;

  &:active {
    background: transparent;
  }
`;

export interface IAppData {
  address: string;
  balance: number;
  isMining: boolean;
  toAddress: string;
  amount: string;
}

interface IProps extends IAppData {
  mineBlock: () => void;
  handleInput: (e: React.ChangeEvent<HTMLButtonElement>) => void;
  handleSubmit: (e: any) => void;
}

const AppPresenter: FC<IProps> = ({
  address, amount, balance, handleInput, handleSubmit, isMining, mineBlock, toAddress,
}) => (
  <AppContainer>
    <Header>
      <h1>js.bitcoin</h1>
      <Button
        onClick={mineBlock}
        disabled={isMining}
      >
        {isMining ? 'isMining' : 'Mine'}
      </Button>
    </Header>
    <Card>
      <h2>Address</h2>
      <Text>{address}</Text>
      <h2>Balance</h2>
      <Text>{balance}</Text>
    </Card>
    <Card>
      <h2>Send Balance</h2>
      <SendTxForm onSubmit={handleSubmit}>
        <Input
          as="input"
          type="text"
          placeholder="Address"
          name="toAddress"
          value={toAddress}
          onChange={handleInput}
        />
        <Input
          as="input"
          type="number"
          placeholder="Amount"
          name="amount"
          value={amount}
          onChange={handleInput}
        />
        <Submit
          as="input"
          type="submit"
          value="Send"
          disabled={!toAddress || !amount || (Number(amount) > Number(balance))}
        />
      </SendTxForm>
    </Card>
  </AppContainer>
);

export default AppPresenter;
