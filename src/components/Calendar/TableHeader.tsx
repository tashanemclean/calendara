import styled from 'styled-components';

interface Props {
  dayNameTextStyle: object;
}

const Days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

export const TableHeader = ({ dayNameTextStyle }: Props) => {
  return (
    <tr>
      {Days.map((day, key) => (
        <Header key={`${day + key++}`}>
          <span style={dayNameTextStyle}>{day}</span>
        </Header>
      ))}
    </tr>
  );
};

const Header = styled.th`
  font-weight: 500;

  span {
    margin: 0 0 20% 0;
  }
`;
